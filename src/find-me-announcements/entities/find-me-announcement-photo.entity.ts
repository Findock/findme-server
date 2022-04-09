import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeAnnouncementPhoto {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public url: string;

    @ManyToOne(() => FindMeUser)
    public user: FindMeUser;

    @CreateDateColumn()
    public created: Date;
}
