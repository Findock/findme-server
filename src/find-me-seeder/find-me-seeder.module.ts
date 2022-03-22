import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FindMeSeederLog, FindMeSeederLogSchema } from "@src/find-me-seeder/schemas/find-me-seeder-log";
import { FindMeSeederService } from "@src/find-me-seeder/services/find-me-seeder.service";
import { FindMeUsersModule } from "@src/find-me-users/find-me-users.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FindMeSeederLog.name,
                schema: FindMeSeederLogSchema,
            },
        ]),
        FindMeUsersModule,
    ],
    providers: [ FindMeSeederService ],
})
export class FindMeSeederModule {}
