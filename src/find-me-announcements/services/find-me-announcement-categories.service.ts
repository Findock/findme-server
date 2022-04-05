import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import announcementCategoriesDataset from "@/find-me-announcements/datasets/announcement-categories.dataset.json";
import { FindMeAnnouncementCategory } from "@/find-me-announcements/entities/find-me-announcement-category.entity";
import { IFindMeAbstractLookupService } from "@/find-me-commons/services/i-find-me-abstract-lookup-service";

@Injectable()
export class FindMeAnnouncementCategoriesService implements IFindMeAbstractLookupService {

    public constructor(
        @InjectRepository(FindMeAnnouncementCategory)
        private announcementCategoriesRepository: Repository<FindMeAnnouncementCategory>
    ) {
        this.synchronizeDataset();
    }

    public async synchronizeDataset(): Promise<void> {
        const count = await this.announcementCategoriesRepository.count();
        if (count !== 0) return;
        announcementCategoriesDataset.forEach(async announcementCategory => {
            await this.createAnnouncementCategory(announcementCategory.id, announcementCategory.namePl);
        });
    }

    public async createAnnouncementCategory(id: number, namePl: string): Promise<FindMeAnnouncementCategory> {
        const announcementCategory = this.announcementCategoriesRepository.create({
            id,
            namePl,
        });
        await this.announcementCategoriesRepository.save(announcementCategory);
        return announcementCategory;
    }

    public async getAllAnnouncementCategories(): Promise<FindMeAnnouncementCategory[]> {
        return this.announcementCategoriesRepository.find();
    }

    public async searchAnnouncementCategories(query: string): Promise<FindMeAnnouncementCategory[]> {
        return this.announcementCategoriesRepository
            .createQueryBuilder("find-me-announcement-category")
            .where("find-me-announcement-category.namePl like :q", { q: `%${query}%` })
            .getMany();
    }
}
