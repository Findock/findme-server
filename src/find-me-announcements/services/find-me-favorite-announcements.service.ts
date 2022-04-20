import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeFavoriteAnnouncement } from "@/find-me-announcements/entities/find-me-favorite-announcement.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeFavoriteAnnouncementsService {
    public constructor(
        @InjectRepository(FindMeFavoriteAnnouncement)
        private favoriteAnnouncementsRepository: Repository<FindMeFavoriteAnnouncement>
    ) { }

    public async addAnnouncementToUserFavorites(
        announcement: FindMeAnnouncement,
        user: FindMeUser
    ): Promise<FindMeFavoriteAnnouncement> {
        const favoriteAnnouncement = this.favoriteAnnouncementsRepository.create({
            announcement,
            user,
        });
        await this.favoriteAnnouncementsRepository.save(favoriteAnnouncement);
        return favoriteAnnouncement;
    }

    public async removeAnnouncementFromUserFavorites(
        announcement: FindMeAnnouncement,
        user: FindMeUser
    ): Promise<void> {
        const favoriteAnnouncement = await this.favoriteAnnouncementsRepository.findOne({
            announcement,
            user,
        });
        this.favoriteAnnouncementsRepository.remove(favoriteAnnouncement);
    }

    public async isAnnouncementInUserFavorites(
        announcement: FindMeAnnouncement,
        user: FindMeUser
    ): Promise<boolean> {
        const favoriteAnnouncement = await this.favoriteAnnouncementsRepository.findOne({
            announcement,
            user,
        });
        return !!favoriteAnnouncement;
    }
}
