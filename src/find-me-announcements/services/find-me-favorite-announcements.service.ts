import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeFavoriteAnnouncement } from "@/find-me-announcements/entities/find-me-favorite-announcement.entity";

@Injectable()
export class FindMeFavoriteAnnouncementsService {
    public constructor(
        @InjectRepository(FindMeFavoriteAnnouncement)
        private favoriteAnnouncementsRepository: Repository<FindMeFavoriteAnnouncement>
    ) { }
}
