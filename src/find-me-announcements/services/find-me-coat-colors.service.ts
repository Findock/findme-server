import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";

import coatColorsDataset from "@/find-me-announcements/datasets/coat_colors.dataset.json";
import { FindMeCoatColor } from "@/find-me-announcements/entities/find-me-coat-color.entity";
import { IFindMeAbstractLookupService } from "@/find-me-commons/services/i-find-me-abstract-lookup-service";

@Injectable()
export class FindMeCoatColorsService implements IFindMeAbstractLookupService {

    public constructor(
        @InjectRepository(FindMeCoatColor)
        private coatColorsRepository: Repository<FindMeCoatColor>
    ) {
        this.synchronizeDataset();
    }

    public async synchronizeDataset(): Promise<void> {
        const count = await this.coatColorsRepository.count();
        if (count !== 0) return;
        coatColorsDataset.forEach(async coatColor => {
            await this.createCoatColor(coatColor.id, coatColor.hex, coatColor.namePl);
        });
    }

    public async createCoatColor(id: number, hex: string, namePl: string): Promise<FindMeCoatColor> {
        const coatColor = this.coatColorsRepository.create({
            id,
            hex,
            namePl,
        });
        await this.coatColorsRepository.save(coatColor);
        return coatColor;
    }

    public async getAllCoatColors(): Promise<FindMeCoatColor[]> {
        return this.coatColorsRepository.find();
    }

    public async searchCoatColors(query: string): Promise<FindMeCoatColor[]> {
        return this.coatColorsRepository
            .createQueryBuilder("find_me_coat_color")
            .where("find_me_coat_color.namePl like :q", { q: `%${query}%` })
            .getMany();
    }
}
