import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeAnimalGenderEnum } from "@/find-me-announcements/enums/find-me-animal-gender.enum";
import { FindMeAnnouncementStatusEnum } from "@/find-me-announcements/enums/find-me-announcement-status.enum";
import { FindMeAnnouncementTypeEnum } from "@/find-me-announcements/enums/find-me-announcement-type.enum";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeAnnouncement {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => FindMeAnnouncementCategory, { nullable: false })
    public category: FindMeAnnouncementCategory;

    @ManyToMany(() => FindMeDistinctiveFeature)
    @JoinTable()
    public distinctiveFeatures: FindMeDistinctiveFeature[];

    @ManyToMany(() => FindMeCoatColor)
    @JoinTable()
    public coatColors: FindMeCoatColor[];

    @Column({ nullable: false })
    public gender: FindMeAnimalGenderEnum;

    @Column({ nullable: false })
    public type: FindMeAnnouncementTypeEnum;

    @Column({
        nullable: false,
        default: FindMeAnnouncementStatusEnum.ACTIVE,
    })
    public status: FindMeAnnouncementStatusEnum;

    @Column({ nullable: false })
    public title: string;

    @Column({ type: "text" })
    public description: string;

    @Column({ nullable: false })
    public locationName: string;

    @Column({ nullable: false })
    public locationDescription: string;

    @Column({
        type: "decimal",
        precision: 8,
        scale: 6,
    })
    public locationLat: number;

    @Column({
        type: "decimal",
        precision: 9,
        scale: 6,
    })
    public locationLon: number;

    @ManyToOne(() => FindMeUser)
    public creator: FindMeUser;

    @CreateDateColumn()
    public createDate: Date;
}
