import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FindMeUsersModule } from './modules/find-me-users/find-me-users.module';
import mongodbConfig from './config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ mongodbConfig ],
    }),
    MongooseModule.forRoot(mongodbConfig().uri),
    FindMeUsersModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(mongodbConfig().uri);
  }
}
