import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, ManyToOne } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeUserDeleteLog {
    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public user: FindMeUser;

    @ApiProperty()
    @CreateDateColumn()
    public deleted: Date;
}
