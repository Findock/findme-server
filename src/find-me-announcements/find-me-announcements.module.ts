import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeAnnouncementCategoriesController }
    from "@/find-me-announcements/controllers/find-me-announcement-categories.controller";
import { FindMeDistinctiveFeaturesController }
    from "@/find-me-announcements/controllers/find-me-distinctive-features.controller";
import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeAnnouncementCategoriesService }
    from "@/find-me-announcements/services/find-me-announcement-categories.service";
import { FindMeDistinctiveFeaturesService }
    from "@/find-me-announcements/services/find-me-distinctive-features.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FindMeDistinctiveFeature,
            FindMeAnnouncementCategory,
        ]),
    ],
    providers: [
        FindMeDistinctiveFeaturesService,
        FindMeAnnouncementCategoriesService,
    ],
    controllers: [
        FindMeDistinctiveFeaturesController,
        FindMeAnnouncementCategoriesController,
    ],
})
export class FindMeAnnouncementsModule { }
