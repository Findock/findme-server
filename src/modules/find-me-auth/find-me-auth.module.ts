import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FindMeSecurityModule } from "@src/modules/find-me-security/find-me-security.module";
import { FindMeUsersModule } from "@src/modules/find-me-users/find-me-users.module";
import { FindMeAuthService } from "./find-me-auth.service";
import { FindMeAuthController } from "./find-me-auth.controller";
import envConfig from "@src/config/env.config";
import { JwtStrategy } from "@src/modules/find-me-auth/find-me-jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { FindMeAuthToken, FindMeAuthTokenSchema } from "@src/modules/find-me-auth/schemas/find-me-auth-token.schema";

const secret = envConfig().encryptKey;

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FindMeAuthToken.name,
                schema: FindMeAuthTokenSchema,
            },
        ]),
        FindMeSecurityModule,
        FindMeUsersModule,
        JwtModule.register({ secret }),
    ],
    providers: [ FindMeAuthService, JwtStrategy ],
    controllers: [ FindMeAuthController ],
    exports: [ FindMeAuthService ],
})
export class FindMeAuthModule {}
