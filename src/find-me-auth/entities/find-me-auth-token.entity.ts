import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeAuthToken {
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({ nullable: false })
    public deviceName: string;

    @ApiProperty()
    @Column({ nullable: false })
    public localizationDescription: string;

    @ApiProperty()
    @Column({ nullable: false })
    public token: string;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public user: FindMeUser;

    @ApiProperty()
    @CreateDateColumn()
    public lastUse: Date;

    @ApiProperty()
    @Column({ default: true })
    public active: boolean;
}
