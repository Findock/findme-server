import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeAnnouncementCategoriesController }
    from "@/find-me-announcements/controllers/find-me-announcement-categories.controller";
import { FindMeAnnouncementPhotosController }
    from "@/find-me-announcements/controllers/find-me-announcement-photos.controller";
import { FindMeAnnouncementsController } from "@/find-me-announcements/controllers/find-me-announcements.controller";
import { FindMeCoatColorsController } from "@/find-me-announcements/controllers/find-me-coat-colors.controller";
import { FindMeDistinctiveFeaturesController }
    from "@/find-me-announcements/controllers/find-me-distinctive-features.controller";
import { FindMeFavoriteAnnouncementsController }
    from "@/find-me-announcements/controllers/find-me-favorite-announcements.controller";
import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeAnnouncementViewLog } from "@/find-me-announcements/entities/find-me-announcement-get-log.entity";
import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeFavoriteAnnouncement } from "@/find-me-announcements/entities/find-me-favorite-announcement.entity";
import { FindMeAnnouncementCategoriesService }
    from "@/find-me-announcements/services/find-me-announcement-categories.service";
import { FindMeAnnouncementPhotosService } from "@/find-me-announcements/services/find-me-announcement-photos.service";
import { FindMeAnnouncementsService } from "@/find-me-announcements/services/find-me-announcements.service";
import { FindMeCoatColorsService } from "@/find-me-announcements/services/find-me-coat-colors.service";
import { FindMeDistinctiveFeaturesService }
    from "@/find-me-announcements/services/find-me-distinctive-features.service";
import { FindMeFavoriteAnnouncementsService }
    from "@/find-me-announcements/services/find-me-favorite-announcements.service";
import { FindMeUsersModule } from "@/find-me-users/find-me-users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FindMeDistinctiveFeature,
            FindMeAnnouncementCategory,
            FindMeCoatColor,
            FindMeAnnouncementPhoto,
            FindMeAnnouncement,
            FindMeFavoriteAnnouncement,
            FindMeAnnouncementViewLog,
        ]),
        FindMeUsersModule,
    ],
    providers: [
        FindMeDistinctiveFeaturesService,
        FindMeAnnouncementCategoriesService,
        FindMeCoatColorsService,
        FindMeAnnouncementPhotosService,
        FindMeAnnouncementsService,
        FindMeFavoriteAnnouncementsService,
    ],
    controllers: [
        FindMeDistinctiveFeaturesController,
        FindMeAnnouncementCategoriesController,
        FindMeCoatColorsController,
        FindMeAnnouncementPhotosController,
        FindMeAnnouncementsController,
        FindMeFavoriteAnnouncementsController,
    ],
})
export class FindMeAnnouncementsModule { }
