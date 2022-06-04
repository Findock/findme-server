import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { FindMeCommentPhoto } from "@/find-me-comments/entities/find-me-comment-photo.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeComment {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => FindMeAnnouncement)
    public commentedAnnouncement: FindMeAnnouncement;

    @ApiProperty()
    @Column({ nullable: false })
    public comment: string;

    @ApiProperty()
    @Column({
        type: "decimal",
        precision: 8,
        scale: 6,
    })
    public locationLat: number;

    @ApiProperty()
    @Column({
        type: "decimal",
        precision: 9,
        scale: 6,
    })
    public locationLon: number;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public creator: FindMeUser;

    @ApiProperty()
    @ManyToMany(() => FindMeCommentPhoto)
    @JoinTable({ name: "find-me-bind-comment-photos" })
    public photos: FindMeCommentPhoto[];

    @ApiProperty()
    @CreateDateColumn()
    public createDate: Date;

    @ApiProperty()
    @Column({ default: false })
    public archived: boolean;
}
