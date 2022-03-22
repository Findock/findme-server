import { Module } from "@nestjs/common";
import { FindMeSeederService } from "@src/find-me-seeder/find-me-seeder.service";
import { FindMeUsersModule } from "@src/find-me-users/find-me-users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FindMeSeederLog, FindMeSeederLogSchema } from "@src/find-me-seeder/schemas/find-me-seeder-log";

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
