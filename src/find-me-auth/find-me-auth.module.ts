import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { FindMeAuthController } from "@src/find-me-auth/controllers/find-me-auth.controller";
import { FindMeAuthToken, FindMeAuthTokenSchema } from "@src/find-me-auth/schemas/find-me-auth-token.schema";
import { FindMeAuthService } from "@src/find-me-auth/services/find-me-auth.service";
import { JwtStrategy } from "@src/find-me-auth/strategies/find-me-jwt.strategy";
import envConfig from "@src/find-me-commons/configurations/env.config";
import { FindMeUsersModule } from "@src/find-me-users/find-me-users.module";

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
