import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeAnnouncementViewLog } from "@/find-me-announcements/entities/find-me-announcement-get-log.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeAnnouncementViewLogsService {
    public constructor(
        @InjectRepository(FindMeAnnouncementViewLog)
        private announcementViewLogsRepository: Repository<FindMeAnnouncementViewLog>
    ) { }

    public async logAnnouncementViewByUser(announcement: FindMeAnnouncement, user: FindMeUser): Promise<void> {
        const viewLog = this.announcementViewLogsRepository.create({
            viewedAnnouncement: announcement,
            viewingUser: user,
        });
        await this.announcementViewLogsRepository.save(viewLog);
    }

    public async getViewLogsAmountForAnnouncements(announcement: FindMeAnnouncement): Promise<number> {
        return (await this.announcementViewLogsRepository.find({ where: { viewedAnnouncement: announcement.id } }))
            .length;
    }
}
