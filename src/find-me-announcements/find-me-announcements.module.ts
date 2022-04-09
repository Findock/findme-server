import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeAnnouncementCategoriesController }
    from "@/find-me-announcements/controllers/find-me-announcement-categories.controller";
import { FindMeAnnouncementPhotosController }
    from "@/find-me-announcements/controllers/find-me-announcement-photos.controller";
import { FindMeCoatColorsController } from "@/find-me-announcements/controllers/find-me-coat-colors.controller";
import { FindMeDistinctiveFeaturesController }
    from "@/find-me-announcements/controllers/find-me-distinctive-features.controller";
import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeAnnouncementCategoriesService }
    from "@/find-me-announcements/services/find-me-announcement-categories.service";
import { FindMeAnnouncementPhotosService } from "@/find-me-announcements/services/find-me-announcement-photos.service";
import { FindMeCoatColorsService } from "@/find-me-announcements/services/find-me-coat-colors.service";
import { FindMeDistinctiveFeaturesService }
    from "@/find-me-announcements/services/find-me-distinctive-features.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FindMeDistinctiveFeature,
            FindMeAnnouncementCategory,
            FindMeCoatColor,
            FindMeAnnouncementPhoto,
        ]),
    ],
    providers: [
        FindMeDistinctiveFeaturesService,
        FindMeAnnouncementCategoriesService,
        FindMeCoatColorsService,
        FindMeAnnouncementPhotosService,
    ],
    controllers: [
        FindMeDistinctiveFeaturesController,
        FindMeAnnouncementCategoriesController,
        FindMeCoatColorsController,
        FindMeAnnouncementPhotosController,
    ],
})
export class FindMeAnnouncementsModule { }
