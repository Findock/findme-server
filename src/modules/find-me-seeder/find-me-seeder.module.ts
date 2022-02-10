import { Module } from '@nestjs/common';
import { FindMeSeederService } from '@src/modules/find-me-seeder/find-me-seeder.service';

@Module({ providers: [ FindMeSeederService ] })
export class FindMeSeederModule {}
