import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeFavoriteAnnouncement } from "@/find-me-announcements/entities/find-me-favorite-announcement.entity";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
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
        const isAnnouncementInUserFavorites = await this.isAnnouncementInUserFavorites(announcement, user);
        if (isAnnouncementInUserFavorites) {
            throw new BadRequestException([ ErrorMessagesConstants.ANNOUNCEMENT_IS_ALREADY_IN_FAVORITES ]);
        }
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
        const isAnnouncementInUserFavorites = await this.isAnnouncementInUserFavorites(announcement, user);
        if (!isAnnouncementInUserFavorites) {
            throw new BadRequestException([ ErrorMessagesConstants.ANNOUNCEMENT_IS_NOT_IN_FAVORITES ]);
        }
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
