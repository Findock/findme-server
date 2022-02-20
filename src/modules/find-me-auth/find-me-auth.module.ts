import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FindMeSecurityModule } from '@src/modules/find-me-security/find-me-security.module';
import { FindMeUsersModule } from '@src/modules/find-me-users/find-me-users.module';
import { FindMeAuthService } from './find-me-auth.service';
import { FindMeAuthController } from './find-me-auth.controller';
import envConfig from '@src/config/env.config';

const secret = envConfig().encryptKey;

@Module({
    imports: [
        FindMeSecurityModule,
        FindMeUsersModule,
        JwtModule.register({ secret }),
    ],
    providers: [ FindMeAuthService ],
    controllers: [ FindMeAuthController ],
})
export class FindMeAuthModule {}
