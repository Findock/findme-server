import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeSeederLog } from "@/find-me-db/entities/find-me-seeder-log.entity";
import { FindMeSeederService } from "@/find-me-db/services/find-me-seeder.service";
import { FindMeUserSeederService } from "@/find-me-db/services/find-me-user-seeder.service";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FindMeSeederLog,
            FindMeUser,
        ]),
    ],
    providers: [
        FindMeSeederService,
        FindMeUserSeederService,
    ],
})
export class FindMeDbModule {}
