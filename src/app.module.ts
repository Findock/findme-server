import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import securityConfig from '@src/config/security.config';
import { FindMeSecurityModule } from '@src/modules/find-me-security/find-me-security.module';
import mongodbConfig from './config/mongodb.config';
import { FindMeUsersModule } from '@src/modules/find-me-users/find-me-users.module';
import { FindMeSeederModule } from '@src/modules/find-me-seeder/find-me-seeder.module';
import { FindMeAuthModule } from './modules/find-me-auth/find-me-auth.module';
import seederConfig from '@src/config/seeder.config';
import envConfig from '@src/config/env.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                mongodbConfig,
                securityConfig,
                seederConfig,
                envConfig,
            ],
        }),
        MongooseModule.forRoot(mongodbConfig().mongodb.uri),
        FindMeUsersModule,
        FindMeSecurityModule,
        FindMeSeederModule,
        FindMeAuthModule,
    ],
})
export class AppModule {
}
