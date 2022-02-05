import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FindMeUsersController } from '@src/modules/findme-users/findme-users.controller';
import { FindmeUsersService } from '@src/modules/findme-users/findme-users.service';
import { FindMeUser, FindMeUserSchema } from '@src/modules/findme-users/schemas/findme-user.schema';

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
