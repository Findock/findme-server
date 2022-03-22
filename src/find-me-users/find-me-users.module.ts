import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FindMeUsersController } from "@src/find-me-users/controllers/find-me-users.controller";
import { FindMeUser, FindMeUserSchema } from "@src/find-me-users/schemas/find-me-user.schema";
import {
    FindMeUserDeleteLog,
    FindMeUserDeleteLogSchema,
} from "@src/find-me-users/schemas/find-me-user-delete-log.schema";
import { FindMeUsersService } from "@src/find-me-users/services/find-me-users.service";

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
