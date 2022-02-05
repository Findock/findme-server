import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FindmeUsersModule } from './modules/findme-users/findme-users.module';
import mongodbConfig from './config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ mongodbConfig ],
    }),
    MongooseModule.forRoot(mongodbConfig().uri),
    FindmeUsersModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(mongodbConfig().uri);
  }
}
