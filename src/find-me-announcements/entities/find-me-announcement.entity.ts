import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";

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
    public gender: string;

    @Column({ nullable: false })
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
}
