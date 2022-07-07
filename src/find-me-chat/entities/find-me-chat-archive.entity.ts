import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeChatArchive {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public archiver: FindMeUser;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public archivedReceiver: FindMeUser;

    @ApiProperty()
    @CreateDateColumn()
    public archiveDate: Date;
}
