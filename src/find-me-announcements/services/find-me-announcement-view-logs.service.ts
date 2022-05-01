import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeAnnouncementViewLog } from "@/find-me-announcements/entities/find-me-announcement-get-log.entity";

@Injectable()
export class FindMeAnnouncementViewLogsService {
    public constructor(
        @InjectRepository(FindMeAnnouncementViewLog)
        private announcementViewLogsRepository: Repository<FindMeAnnouncementViewLog>
    ) { }
}
