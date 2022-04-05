import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import distinctiveFeaturesDataset from "@/find-me-announcements/datasets/distinctive-features.dataset.json";
import { FindMeDistinctiveFeature } from "@/find-me-announcements/entities/find-me-distinctive-feature.entity";
import { IFindMeAbstractLookup } from "@/find-me-commons/services/i-find-me-abstract-lookup";

@Injectable()
export class FindMeDistinctiveFeaturesService implements IFindMeAbstractLookup {
    public constructor(
        @InjectRepository(FindMeDistinctiveFeature)
        private distinctiveFeaturesRepository: Repository<FindMeDistinctiveFeature>
    ) {
        this.synchronizeDataset();
    }

    public async synchronizeDataset(): Promise<void> {
        this.distinctiveFeaturesRepository.count().then(async count => {
            if (count !== 0) return;
            distinctiveFeaturesDataset.forEach(async distinctiveFeature => {
                await this.createDistinctiveFeature(distinctiveFeature.id, distinctiveFeature.namePl);
            });
        });
    }

    public async createDistinctiveFeature(id: number, namePl: string): Promise<FindMeDistinctiveFeature> {
        const distinctiveFeature = this.distinctiveFeaturesRepository.create({
            id,
            namePl,
        });
        await this.distinctiveFeaturesRepository.save(distinctiveFeature);
        return distinctiveFeature;
    }

    public async getAllDistinctiveFeatures(): Promise<FindMeDistinctiveFeature[]> {
        return this.distinctiveFeaturesRepository.find();
    }

    public async searchDistinctiveFeatures(query: string): Promise<FindMeDistinctiveFeature[]> {
        return this.distinctiveFeaturesRepository
            .createQueryBuilder("find_me_distinctive_feature")
            .where("find_me_distinctive_feature.namePl like :q", { q: "%" + query + "%" })
            .getMany();
    }
}
