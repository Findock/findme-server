import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeUsersController } from "@/find-me-users/controllers/find-me-users.controller";
import { FindMeUsersMeController } from "@/find-me-users/controllers/find-me-users-me.controller";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUserAccessLog } from "@/find-me-users/entities/find-me-user-access-log.entity";
import { FindMeUserDeleteLog } from "@/find-me-users/entities/find-me-user-delete-log.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";
import { FindMeUsersAccessLogService } from "@/find-me-users/services/find-me-users-access-log.service";
import { FindMeUsersAnonymizeService } from "@/find-me-users/services/find-me-users-anonymize.service";
import { FindMeUsersProfileImagesService } from "@/find-me-users/services/find-me-users-profile-images.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FindMeUser,
            FindMeUserAccessLog,
            FindMeUserDeleteLog,
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
