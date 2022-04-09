import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { envConfig } from "@/find-me-commons/configurations/env.config";
import { FindMeLocationModule } from "@/find-me-location/find-me-location.module";
import { FindMeAuthController } from "@/find-me-security/controllers/find-me-auth.controller";
import { FindMeAuthToken } from "@/find-me-security/entities/find-me-auth-token.entity";
import { FindMeResetPasswordToken } from "@/find-me-security/entities/find-me-reset-password-token.entity";
import { FindMeAuthService } from "@/find-me-security/services/find-me-auth.service";
import { FindMeSecurityEncryptionService } from "@/find-me-security/services/find-me-security-encryption.service";
import { JwtStrategy } from "@/find-me-security/strategies/find-me-jwt.strategy";
import { FindMeUsersModule } from "@/find-me-users/find-me-users.module";

const secret = envConfig().encryptKey;

@Global()
    @Module({
        imports: [
            TypeOrmModule.forFeature([
                FindMeAuthToken,
                FindMeResetPasswordToken,
            ]),
            FindMeUsersModule,
            JwtModule.register({ secret }),
            FindMeLocationModule,
        ],
        providers: [
            FindMeAuthService,
            JwtStrategy,
            FindMeSecurityEncryptionService,
        ],
        controllers: [ FindMeAuthController ],
        exports: [ FindMeSecurityEncryptionService ],
    })
export class FindMeSecurityModule {}
