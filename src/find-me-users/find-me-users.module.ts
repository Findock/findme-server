import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FindMeUsersController } from "@/find-me-users/controllers/find-me-users.controller";
import { FindMeUsersMeController } from "@/find-me-users/controllers/find-me-users-me.controller";
import { FindMeUser, FindMeUserSchema } from "@/find-me-users/schemas/find-me-user.schema";
import {
    FindMeUserAccessLog,
    FindMeUserAccessLogSchema,
} from "@/find-me-users/schemas/find-me-user-access-log.schema";
import {
    FindMeUserDeleteLog,
    FindMeUserDeleteLogSchema,
} from "@/find-me-users/schemas/find-me-user-delete-log.schema";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";
import { FindMeUsersAccessLogService } from "@/find-me-users/services/find-me-users-access-log.service";
import { FindMeUsersAnonymizeService } from "@/find-me-users/services/find-me-users-anonymize.service";
import { FindMeUsersProfileImagesService } from "@/find-me-users/services/find-me-users-profile-images.service";

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
            {
                name: FindMeUserAccessLog.name,
                schema: FindMeUserAccessLogSchema,
            },
        ]),
    ],
    controllers: [
        FindMeUsersController,
        FindMeUsersMeController,
    ],
    providers: [
        FindMeUsersService,
        FindMeUsersProfileImagesService,
        FindMeUsersAnonymizeService,
        FindMeUsersAccessLogService,
    ],
    exports: [
        FindMeUsersService,
        FindMeUsersProfileImagesService,
        FindMeUsersAnonymizeService,
        FindMeUsersAccessLogService,
    ],
})
export class FindMeUsersModule {}
