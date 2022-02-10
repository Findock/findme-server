import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FindMeSecurityModule } from '@src/modules/find-me-security/find-me-security.module';
import { FindMeUser, FindMeUserSchema } from '@src/modules/find-me-users/schemas/find-me-user.schema';
import { FindMeUsersController } from '@src/modules/find-me-users/find-me-users.controller';
import { FindMeUsersService } from '@src/modules/find-me-users/find-me-users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FindMeUser.name,
        schema: FindMeUserSchema,
      },
    ]),
    FindMeSecurityModule,
  ],
  controllers: [ FindMeUsersController ],
  providers: [ FindMeUsersService ],
  exports: [ FindMeUsersService ],
})
export class FindMeUsersModule {}
