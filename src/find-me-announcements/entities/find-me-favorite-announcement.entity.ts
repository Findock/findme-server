import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeFavoriteAnnouncement {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => FindMeUser)
    public user: FindMeUser;

    @ManyToOne(() => FindMeAnnouncement)
    public announcement: FindMeAnnouncement;
}
