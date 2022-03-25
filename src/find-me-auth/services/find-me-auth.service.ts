import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuid } from "uuid";

import { AuthLoginDto } from "@/find-me-auth/dto/auth-login.dto";
import { AuthTokenDto } from "@/find-me-auth/dto/auth-token.dto";
import { FindMeAuthToken, FindMeAuthTokenDocument } from "@/find-me-auth/schemas/find-me-auth-token.schema";
import {
    FindMeResetPasswordToken,
    FindMeResetPasswordTokenDocument,
} from "@/find-me-auth/schemas/find-me-reset-password.token.schema";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeMailerService } from "@/find-me-mailer/services/find-me-mailer.service";
import { FindMeSecurityEncryptionService } from "@/find-me-security/services/find-me-security-encryption.service";
import { FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";

@Injectable()
export class FindMeAuthService {

    public constructor(
        @InjectModel(FindMeAuthToken.name) private readonly authTokenModel: Model<FindMeAuthTokenDocument>,
        @InjectModel(FindMeResetPasswordToken.name)
            private readonly resetPasswordTokenModel: Model<FindMeResetPasswordTokenDocument>,
        private readonly securityEncryptionService: FindMeSecurityEncryptionService,
        private readonly usersService: FindMeUsersService,
        private readonly jwtService: JwtService,
        private readonly mailerService: FindMeMailerService,
        private readonly configService: ConfigService
    ) {}

    public async validateUser(email: string, password: string): Promise<FindMeUserDocument> {
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
            _id: user._id.toString(),
            t: Date.now(),
        });

        await this.authTokenModel.create({
            deviceName: loginDto.deviceName,
            localizationDescription: loginDto.localizationDescription,
            token: "Bearer " + authToken,
            userId: user._id.toString(),
        });

        return {
            access_token: authToken,
            token_type: "Bearer",
        };
    }

    public async validateToken(token: string): Promise<boolean> {
        return !!await this.authTokenModel.findOne({
            token,
            active: true,
        });
    }

    public async bumpTokenLastUse(token: string): Promise<void> {
        await this.authTokenModel.findOneAndUpdate({ token }, { lastUse: new Date() });
    }

    public async logout(token: string): Promise<void> {
        await this.authTokenModel.findOneAndUpdate({ token }, { active: false });
    }

    public async getAuthTokensForUser(userId: string): Promise<FindMeAuthToken[]> {
        return (await this.authTokenModel.find({ userId }).sort({ lastUse: -1 }).lean()).map(authToken => {
            const object = { ...authToken };
            delete object.token;
            return object;
        });
    }

    public async removeAuthTokenByIdForUser(tokenId: string, user: FindMeUserDocument): Promise<void> {
        const authToken = await this.authTokenModel.findById(tokenId);
        if (!authToken || authToken.active === false) {
            throw new BadRequestException([ ErrorMessagesConstants.TOKEN_DOES_NOT_EXIST_OR_IS_INACTIVE ]);
        }
        if (authToken.userId !== user._id.toString()) throw new UnauthorizedException();
        authToken.active = false;
        await authToken.save();
    }

    public async sendResetPasswordLink(userEmail: string): Promise<void> {
        const user = await this.usersService.findOneByEmail(userEmail);
        if (!user) throw new BadRequestException([ ErrorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST ]);
        const link = await this.generateResetPasswordLinkForUser(user._id);
        await this.mailerService.sendResetPasswordLink(
            userEmail,
            user.name,
            link
        );
    }

    public async resetUserPasswordWithToken(token: string, newPassword: string): Promise<void> {
        const passwordResetTokenObject = await this.resetPasswordTokenModel.findOne({ token }).populate("user");
        if (!passwordResetTokenObject) {
            throw new BadRequestException([ ErrorMessagesConstants.INVALID_PASSWORD_RESET_TOKEN ]);
        }
        const user = await this.usersService.findOneById(passwordResetTokenObject.user._id);
        if (!user) {
            throw new BadRequestException([ ErrorMessagesConstants.INVALID_PASSWORD_RESET_TOKEN ]);
        }
        user.password = this.securityEncryptionService.encryptValue(newPassword);
        await user.save();
        await passwordResetTokenObject.delete();
    }

    private async generateResetPasswordLinkForUser(userId: string): Promise<string> {
        const token = this.securityEncryptionService.encryptValue(uuid());
        await this.resetPasswordTokenModel.create({
            user: userId,
            token,
        });
        return `${this.configService.get<string>("rootUrl")}static/reset-password?token=${token}`;
    }
}

