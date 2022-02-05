import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FindMeUsersController } from './findme-users.controller';
import { FindMeUser, FindMeUserSchema } from './schemas/findme-user.schema';
import { FindmeUsersService } from './findme-users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FindMeUser.name,
        schema: FindMeUserSchema,
      },
    ]),
  ],
  controllers: [ FindMeUsersController ],
  providers: [ FindmeUsersService ],
})
export class FindmeUsersModule {}
