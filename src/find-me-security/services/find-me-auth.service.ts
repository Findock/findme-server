import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";

import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeNominatimService } from "@/find-me-location/services/find-me-nominatim.service";
import { FindMeMailerService } from "@/find-me-mailer/services/find-me-mailer.service";
import { AuthLoginDto } from "@/find-me-security/dto/auth-login.dto";
import { AuthTokenDto } from "@/find-me-security/dto/auth-token.dto";
import { FindMeAuthToken } from "@/find-me-security/entities/find-me-auth-token.entity";
import { FindMeResetPasswordToken } from "@/find-me-security/entities/find-me-reset-password-token.entity";
import { FindMeSecurityEncryptionService } from "@/find-me-security/services/find-me-security-encryption.service";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";

@Injectable()
export class FindMeAuthService {

    public constructor(
        @InjectRepository(FindMeAuthToken)
        private authTokenRepository: Repository<FindMeAuthToken>,
        @InjectRepository(FindMeResetPasswordToken)
        private resetPasswordTokenRepository: Repository<FindMeResetPasswordToken>,
        private securityEncryptionService: FindMeSecurityEncryptionService,
        private usersService: FindMeUsersService,
        private jwtService: JwtService,
        private mailerService: FindMeMailerService,
        private configService: ConfigService,
        private nominatimService: FindMeNominatimService
    ) { }

    public async validateUser(email: string, password: string): Promise<FindMeUser> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException([ ErrorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST ]);
        }
        if (this.securityEncryptionService.encryptValue(password) !== user.password) {
            throw new UnauthorizedException([ ErrorMessagesConstants.WRONG_PASSWORD ]);
        }
        return user;
    }

    public async login(loginDto: AuthLoginDto): Promise<AuthTokenDto> {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        const authToken = this.jwtService.sign({
            id: user.id,
            t: Date.now(),
        });

        let decodedLocationString = loginDto.localizationDescription;
        if (loginDto.localizationDescription !== "unknown") {
            const possibleCoordinates = loginDto.localizationDescription.split(" ");
            if (possibleCoordinates.length === 2) {
                const [
                    lat,
                    lon,
                ] = possibleCoordinates;
                const nominatimPossibleLocation = await this.nominatimService.searchLocationsByCoordinates(+lat, +lon);
                decodedLocationString = nominatimPossibleLocation.name || "unknown";
            }
        }

        await this.authTokenRepository.insert({
            deviceName: loginDto.deviceName,
            localizationDescription: decodedLocationString,
            token: "Bearer " + authToken,
            user: user,
        });

        await this.usersService.bumpUserLastLogin(user);

        return {
            access_token: authToken,
            token_type: "Bearer",
        };
    }

    public async validateToken(token: string): Promise<boolean> {
        return !!await this.authTokenRepository.findOne({
            where: {
                token,
                active: true,
            },
        });
    }

    public async bumpTokenLastUse(token: string): Promise<void> {
        const tokenEntity = await this.authTokenRepository.findOne({ where: { token } });
        tokenEntity.lastUse = new Date();
        await this.authTokenRepository.save(tokenEntity);
    }

    public async logout(token: string): Promise<void> {
        const tokenEntity = await this.authTokenRepository.findOne({ where: { token } });
        tokenEntity.active = false;
        await this.authTokenRepository.save(tokenEntity);
    }

    public async getAuthTokensForUser(user: FindMeUser): Promise<FindMeAuthToken[]> {
        const tokens = await this.authTokenRepository
            .createQueryBuilder("find_me_auth_token")
            .where("find_me_auth_token.userId = :userId", { userId: user.id })
            .getMany();

        return tokens.map(t => {
            delete t.token;
            return t;
        });
    }

    public async removeAuthTokenByIdForUser(tokenId: number, user: FindMeUser): Promise<void> {
        const authToken = await this.authTokenRepository.findOne({
            where: { id: tokenId },
            relations: [ "user" ],
        });
        if (!authToken || authToken.active === false) {
            throw new BadRequestException([ ErrorMessagesConstants.TOKEN_DOES_NOT_EXIST_OR_IS_INACTIVE ]);
        }
        if (authToken.user.id !== user.id) throw new UnauthorizedException();
        authToken.active = false;
        await this.authTokenRepository.save(authToken);
    }

    public async sendResetPasswordLink(userEmail: string): Promise<void> {
        const user = await this.usersService.findOneByEmail(userEmail);
        if (!user) throw new NotFoundException([ ErrorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST ]);
        const link = await this.generateResetPasswordLinkForUser(user);
        await this.mailerService.sendResetPasswordLinkMail(
            userEmail,
            user.name,
            link
        );
    }

    public async resetUserPasswordWithToken(token: string, newPassword: string): Promise<void> {
        const passwordResetTokenObject = await this.resetPasswordTokenRepository.findOne({
            where: { token },
            relations: [ "user" ],
        });
        if (!passwordResetTokenObject) {
            throw new BadRequestException([ ErrorMessagesConstants.INVALID_PASSWORD_RESET_TOKEN ]);
        }
        const user = passwordResetTokenObject.user;
        if (!user) {
            throw new BadRequestException([ ErrorMessagesConstants.INVALID_PASSWORD_RESET_TOKEN ]);
        }
        await this.usersService.forceUpdateUserPassword(user, this.securityEncryptionService.encryptValue(newPassword));
        await this.resetPasswordTokenRepository.remove(passwordResetTokenObject);
    }

    private async generateResetPasswordLinkForUser(user: FindMeUser): Promise<string> {
        const token = this.securityEncryptionService.encryptValue(uuid());
        await this.resetPasswordTokenRepository.insert({
            user,
            token,
        });
        return `${this.configService.get<string>("rootUrl")}static/reset-password?token=${token}`;
    }
}

