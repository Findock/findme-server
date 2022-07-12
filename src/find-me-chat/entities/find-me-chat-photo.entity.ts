import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { envConfig } from "@/find-me-commons/configurations/env.config";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeChatPhoto {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Transform(({ value }) => value ? envConfig().rootUrl + value : value)
    @Column()
    public url: string;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public user: FindMeUser;

    @ApiProperty()
    @CreateDateColumn()
    public created: Date;
}
