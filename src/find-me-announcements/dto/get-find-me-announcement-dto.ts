import { ApiProperty } from "@nestjs/swagger";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";

export class GetFindMeAnnouncementDto extends FindMeAnnouncement {
    @ApiProperty({ example: true })
    public isUserCreator: boolean;

    @ApiProperty({ example: true })
    public isInFavorites: boolean;

    @ApiProperty({ example: 1 })
    public viewsAmount: number;
}
