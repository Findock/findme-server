import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import { envConfig } from "@/find-me-commons/configurations/env.config";

@Entity()
export class FindMeUser {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({ nullable: false })
    public email: string;

    @Exclude()
    @Column({ nullable: false })
    public password: string;

    @ApiProperty()
    @Column({ default: "" })
    public name: string;

    @ApiProperty()
    @Column({ default: "" })
    public phoneNumber: string;

    @ApiProperty()
    @Transform(({ value }) => value ? envConfig().rootUrl + value : value)
    @Column({ default: "" })
    public profileImageUrl: string;

    @ApiProperty()
    @CreateDateColumn()
    public created: Date;

    @ApiProperty()
    @CreateDateColumn()
    public lastLogin: Date;

    @ApiProperty()
    @Column({ default: "" })
    public street: string;

    @ApiProperty()
    @Column({ default: "" })
    public city: string;

    @ApiProperty()
    @Column({ default: "" })
    public bio: string;
}
