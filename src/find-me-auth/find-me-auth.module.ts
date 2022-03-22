import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import { FindMeAuthController } from "@/find-me-auth/controllers/find-me-auth.controller";
import { FindMeAuthToken, FindMeAuthTokenSchema } from "@/find-me-auth/schemas/find-me-auth-token.schema";
import {
    FindMeResetPasswordToken,
    FindMeResetPasswordTokenSchema,
} from "@/find-me-auth/schemas/find-me-reset-password.token.schema";
import { FindMeAuthService } from "@/find-me-auth/services/find-me-auth.service";
import { JwtStrategy } from "@/find-me-auth/strategies/find-me-jwt.strategy";
import envConfig from "@/find-me-commons/configurations/env.config";
import { FindMeUsersModule } from "@/find-me-users/find-me-users.module";

const secret = envConfig().encryptKey;

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FindMeAuthToken.name,
                schema: FindMeAuthTokenSchema,
            },
            {
                name: FindMeResetPasswordToken.name,
                schema: FindMeResetPasswordTokenSchema,
            },
        ]),
        FindMeUsersModule,
        JwtModule.register({ secret }),
    ],
    providers: [ FindMeAuthService, JwtStrategy ],
    controllers: [ FindMeAuthController ],
    exports: [ FindMeAuthService ],
})
export class FindMeAuthModule {}
