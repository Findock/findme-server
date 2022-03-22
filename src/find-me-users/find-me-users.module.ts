import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FindMeUser, FindMeUserSchema } from "@src/find-me-users/schemas/find-me-user.schema";
import { FindMeUsersController } from "@src/find-me-users/find-me-users.controller";
import { FindMeUsersService } from "@src/find-me-users/find-me-users.service";
import { FindMeUserDeleteLog, FindMeUserDeleteLogSchema } from "@src/find-me-users/schemas/find-me-user-delete-log.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FindMeUser.name,
                schema: FindMeUserSchema,
            },
            {
                name: FindMeUserDeleteLog.name,
                schema: FindMeUserDeleteLogSchema,
            },
        ]),
    ],
    controllers: [ FindMeUsersController ],
    providers: [ FindMeUsersService ],
    exports: [ FindMeUsersService ],
})
export class FindMeUsersModule {}
