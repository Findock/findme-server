import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import securityConfig from '@src/config/security.config';
import { FindMeSecurityModule } from '@src/modules/find-me/security/find-me-security.module';
import { FindMeUsersModule } from '@src/modules/find-me/users/find-me-users.module';
import mongodbConfig from './config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        mongodbConfig,
        securityConfig,
      ],
    }),
    MongooseModule.forRoot(mongodbConfig().mongodb.uri),
    FindMeUsersModule,
    FindMeSecurityModule,
  ],
})
export class AppModule {}
