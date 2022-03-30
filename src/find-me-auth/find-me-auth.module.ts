import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeAuthController } from "@/find-me-auth/controllers/find-me-auth.controller";
import { FindMeAuthToken } from "@/find-me-auth/entities/find-me-auth-token.entity";
import { FindMeResetPasswordToken } from "@/find-me-auth/entities/find-me-reset-password-token.entity";
import { FindMeAuthService } from "@/find-me-auth/services/find-me-auth.service";
import { JwtStrategy } from "@/find-me-auth/strategies/find-me-jwt.strategy";
import { envConfig } from "@/find-me-commons/configurations/env.config";
import { FindMeUsersModule } from "@/find-me-users/find-me-users.module";

const secret = envConfig().encryptKey;

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FindMeAuthToken,
            FindMeResetPasswordToken,
        ]),
        FindMeUsersModule,
        JwtModule.register({ secret }),
    ],
    providers: [ FindMeAuthService, JwtStrategy ],
    controllers: [ FindMeAuthController ],
    exports: [ FindMeAuthService ],
})
export class FindMeAuthModule {}
