import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { AuthLoginDto } from "@/find-me-auth/dto/auth-login.dto";
import { AuthTokenDto } from "@/find-me-auth/dto/auth-token.dto";
import { FindMeAuthToken, FindMeAuthTokenDocument } from "@/find-me-auth/schemas/find-me-auth-token.schema";
import errorMessagesConstants from "@/find-me-commons/constants/error-messages.constants";
import { FindMeSecurityService } from "@/find-me-security/services/find-me-security.service";
import { FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";

@Injectable()
export class FindMeAuthService {

    public constructor(
        @InjectModel(FindMeAuthToken.name) private readonly authTokenModel: Model<FindMeAuthTokenDocument>,
        private securityService: FindMeSecurityService,
        private usersService: FindMeUsersService,
        private jwtService: JwtService
    ) {}

    public async validateUser(email: string, password: string): Promise<FindMeUserDocument> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException([ errorMessagesConstants.USER_WITH_THIS_EMAIL_DOES_NOT_EXIST ]);
        }
        if (this.securityService.encryptValue(password) !== user.password) {
            throw new UnauthorizedException([ errorMessagesConstants.WRONG_PASSWORD ]);
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
            throw new BadRequestException([ errorMessagesConstants.TOKEN_DOES_NOT_EXIST_OR_IS_INACTIVE ]);
        }
        if (authToken.userId !== user._id.toString()) throw new UnauthorizedException();
        authToken.active = false;
        await authToken.save();
    }
}

