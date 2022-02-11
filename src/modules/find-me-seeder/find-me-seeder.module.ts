import { Module } from '@nestjs/common';
import { FindMeSeederService } from '@src/modules/find-me-seeder/find-me-seeder.service';
import { FindMeUsersModule } from '@src/modules/find-me-users/find-me-users.module';
import { FindMeSecurityModule } from '@src/modules/find-me-security/find-me-security.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FindMeSeederLog, FindMeSeederLogSchema } from '@src/modules/find-me-seeder/schemas/find-me-seeder-log';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FindMeSeederLog.name,
                schema: FindMeSeederLogSchema,
            },
        ]),
        FindMeUsersModule,
        FindMeSecurityModule,
    ],
    providers: [ FindMeSeederService ],
})
export class FindMeSeederModule {}
