import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeChatPhoto } from "@/find-me-chat/entities/find-me-chat-photo.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeChatMessage {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public sender: FindMeUser;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public receiver: FindMeUser;

    @ApiProperty()
    @Column()
    public message: string;

    @ApiProperty()
    @Column({
        type: "decimal",
        precision: 8,
        scale: 6,
        nullable: true,
    })
    public locationLat: number;

    @ApiProperty()
    @Column({
        type: "decimal",
        precision: 9,
        scale: 6,
        nullable: true,
    })
    public locationLon: number;

    @ApiProperty()
    @ManyToMany(() => FindMeChatPhoto)
    @JoinTable({ name: "find-me-bind-chat-photos" })
    public photos: FindMeChatPhoto[];

    @ApiProperty()
    @Column({ nullable: true })
    public readDate: Date;

    @ApiProperty()
    @CreateDateColumn()
    public sentDate: Date;
}
