import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeComment {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

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
    @CreateDateColumn()
    public createDate: Date;

    @ApiProperty()
    @Column({ default: false })
    public archived :boolean;
}
