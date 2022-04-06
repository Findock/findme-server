import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FindMeCoatColor {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @Column({ nullable: false })
    public hex: string;

    @ApiProperty()
    @Column({ nullable: false })
    public namePl: string;
}
