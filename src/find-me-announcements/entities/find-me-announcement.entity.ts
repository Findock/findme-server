import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeAnimalGenderEnum } from "@/find-me-announcements/enums/find-me-animal-gender.enum";
import { FindMeAnnouncementStatusEnum } from "@/find-me-announcements/enums/find-me-announcement-status.enum";
import { FindMeAnnouncementTypeEnum } from "@/find-me-announcements/enums/find-me-announcement-type.enum";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeAnnouncement {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public creator: FindMeUser;

    @ApiProperty()
    @ManyToOne(() => FindMeAnnouncementCategory, { nullable: false })
    public category: FindMeAnnouncementCategory;

    @ApiProperty()
    @Column({ nullable: false })
    public title: string;

    @ApiProperty()
    @Column({ type: "text" })
    public description: string;

    @ApiProperty()
    @Column({ nullable: false })
    public gender: FindMeAnimalGenderEnum;

    @ApiProperty()
    @Column({ nullable: false })
    public type: FindMeAnnouncementTypeEnum;

    @ApiProperty()
    @Column({
        nullable: false,
        default: FindMeAnnouncementStatusEnum.ACTIVE,
    })
    public status: FindMeAnnouncementStatusEnum;

    @ApiProperty()
    @ManyToMany(() => FindMeDistinctiveFeature)
    @JoinTable({ name: "find-me-bind-announcement-distinctive-features" })
    public distinctiveFeatures: FindMeDistinctiveFeature[];

    @ApiProperty()
    @ManyToMany(() => FindMeCoatColor)
    @JoinTable({ name: "find-me-bind-announcement-coat-colors" })
    public coatColors: FindMeCoatColor[];

    @ApiProperty()
    @ManyToMany(() => FindMeAnnouncementPhoto)
    @JoinTable({ name: "find-me-bind-announcement-photos" })
    public photos: FindMeAnnouncementPhoto[];

    @ApiProperty()
    @Column({ nullable: false })
    public locationName: string;

    @ApiProperty()
    @Column({ nullable: false })
    public locationDescription: string;

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
    @CreateDateColumn()
    public createDate: Date;
}
