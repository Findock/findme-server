import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FindMeUsersModule } from "@src/find-me-users/find-me-users.module";
import envConfig from "@src/find-me-commons/config/env.config";
import { JwtStrategy } from "@src/find-me-auth/find-me-jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { FindMeAuthToken, FindMeAuthTokenSchema } from "@src/find-me-auth/schemas/find-me-auth-token.schema";
import { FindMeAuthService } from "@src/find-me-auth/find-me-auth.service";
import { FindMeAuthController } from "@src/find-me-auth/find-me-auth.controller";

const secret = envConfig().encryptKey;

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FindMeAuthToken.name,
                schema: FindMeAuthTokenSchema,
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
