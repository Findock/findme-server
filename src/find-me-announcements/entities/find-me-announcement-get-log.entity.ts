import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeAnnouncementViewLog {
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @ManyToOne(() => FindMeAnnouncement)
    public viewedAnnouncement: FindMeAnnouncement;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public viewingUser: FindMeUser;

    @ApiProperty()
    @CreateDateColumn()
    public viewDate: Date;
}
