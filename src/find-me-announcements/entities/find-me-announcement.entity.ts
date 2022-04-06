import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { FindMeAnimalGenderEnum } from "@/find-me-announcements/enums/find-me-animal-gender.enum";
import { FindMeAnnouncementTypeEnum } from "@/find-me-announcements/enums/find-me-announcement-type.enum";

@Entity()
export class FindEeAnnouncement {
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

    @Column({
        enum: FindMeAnimalGenderEnum,
        nullable: false,
    })
    public gender: string;

    @Column({
        enum: FindMeAnnouncementTypeEnum,
        nullable: false,
    })
    public type: string;

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
        scale: 8,
        precision: 6,
    })
    public locationLat: number;

    @Column({
        type: "decimal",
        scale: 9,
        precision: 6,
    })
    public locationLon: number;
}
