import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeDistinctiveFeaturesController }
    from "@/find-me-announcements/controllers/find-me-distinctive-features.controller";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeDistinctiveFeaturesService }
    from "@/find-me-announcements/services/find-me-distinctive-features.service";

@Module({
    imports: [ TypeOrmModule.forFeature([ FindMeDistinctiveFeature ]) ],
    providers: [ FindMeDistinctiveFeaturesService ],
    controllers: [ FindMeDistinctiveFeaturesController ],
})
export class FindMeAnnouncementsModule { }
