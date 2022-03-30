import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, ManyToOne } from "typeorm";

import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Entity()
export class FindMeUserAccessLog {
    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public accessedUser: FindMeUser;

    @ApiProperty()
    @ManyToOne(() => FindMeUser)
    public accessingUser: FindMeUser;

    @ApiProperty()
    @CreateDateColumn()
    public deleted: Date;

    @ApiProperty()
    @CreateDateColumn()
    public accessDate: Date;
}
