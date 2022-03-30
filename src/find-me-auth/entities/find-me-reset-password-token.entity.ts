import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeResetPasswordToken {
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public user: FindMeUser;

    @ApiProperty()
    @Column({ nullable: false })
    public token: string;

    @ApiProperty()
    @CreateDateColumn()
    public generated: Date;
}
