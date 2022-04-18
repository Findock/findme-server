import { ApiProperty } from "@nestjs/swagger";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";

export class GetFindMeAnnouncementDto extends FindMeAnnouncement {
    @ApiProperty({ example: true })
    public isUserCreator: boolean;
}
