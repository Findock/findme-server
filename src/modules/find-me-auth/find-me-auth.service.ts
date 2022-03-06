import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import errorMessagesConstants from "@src/constants/error-messages.constants";
import { AuthTokenDto } from "@src/modules/find-me-auth/dto/auth-token.dto";
import { AuthLoginDto } from "@src/modules/find-me-auth/dto/auth-login.dto";
import { FindMeSecurityService } from "@src/modules/find-me-security/find-me-security.service";
import { FindMeUsersService } from "@src/modules/find-me-users/find-me-users.service";
import { InjectModel } from "@nestjs/mongoose";
import { FindMeAuthToken, FindMeAuthTokenDocument } from "@src/modules/find-me-auth/schemas/find-me-auth-token.schema";
import { Model } from "mongoose";
import { FindMeUserDocument } from "@src/modules/find-me-users/schemas/find-me-user.schema";

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
        return !!await this.authTokenModel.findOne({ token });
    }

    public async bumpTokenLastUse(token: string): Promise<void> {
        await this.authTokenModel.findOneAndUpdate({ token }, { lastUse: new Date() });
    }

    public async logout(token: string): Promise<void> {
        await this.authTokenModel.findOneAndRemove({ token });
    }

    public async getActiveAuthTokensForUser(userId: string): Promise<FindMeAuthToken[]> {
        return (await this.authTokenModel.find({ userId }).lean()).map(authToken => {
            const object = { ...authToken };
            delete object.token;
            return object;
        });
    }
}

