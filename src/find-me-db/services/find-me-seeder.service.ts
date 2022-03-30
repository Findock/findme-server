import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeSeederLog } from "@/find-me-db/entities/find-me-seeder-log.entity";

@Injectable()
export class FindMeSeederService {
    public constructor(
        @InjectRepository(FindMeSeederLog)
        private seederLogRepository: Repository<FindMeSeederLog>,
    ) { }

    public async flagAsSeeded(key: string): Promise<void> {
        let seederLog = await this.seederLogRepository.findOne({ where: { key } });
        if (!seederLog) {
            seederLog = this.seederLogRepository.create({ key });
        }
        seederLog.seeded = true;
        await this.seederLogRepository.save(seederLog);
    }

    public async isSeeded(key: string): Promise<boolean> {
        const seederLog = await this.seederLogRepository.findOne({ where: { key } });
        if (!seederLog) return false;
        return seederLog.seeded;
    }
}
