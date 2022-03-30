import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import faker from "faker";
import { Model } from "mongoose";

import { EnvironmentConstants } from "@/find-me-commons/constants/environment.constants";
import { SeederKeysConstants } from "@/find-me-seeder/constants/SeederKeysConstants";
import { FindMeSeederLog, FindMeSeederLogDocument } from "@/find-me-seeder/schemas/find-me-seeder-log";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";
import { FindMeUsersService } from "@/find-me-users/services/find-me-users.service";

@Injectable()
export class FindMeSeederService {
    public constructor(
        @InjectModel(FindMeSeederLog.name) private readonly findMeSeederLogModel: Model<FindMeSeederLogDocument>,
        private readonly findMeUsersService: FindMeUsersService,
        private readonly configService: ConfigService
    ) {
        if (![
            EnvironmentConstants.DOCKER,
            EnvironmentConstants.LOCAL,
        ].includes(this.configService.get<string>("env"))) {
            Logger.log("Seeder service is disabled in production", this.constructor.name);
            return;
        }

        this.seedFindMeUsers(configService.get<number>("seeder.usersSeedCount")).then();
    }

    public async seedFindMeUsers(amount: number): Promise<void> {
        if (!await this.checkIfSeederLogExists(SeederKeysConstants.USERS)) {
            await this.createSeederLog(SeederKeysConstants.USERS);
            for (let i = 0; i < amount; i++) {
                const user: FindMeUser = {
                    id: null,
                    name: faker.name.firstName() + " " + faker.name.lastName(),
                    email: "bunia" + (i > 0 ? i : "") + "@gmail.com",
                    password: "bunia1",
                    phoneNumber: faker.phone.phoneNumber(),
                    lastLogin: new Date(),
                    created: new Date(),
                    profileImageUrl: "https://picsum.photos/300/300",
                    bio: faker.lorem.words(10),
                    city: faker.address.city(),
                    street: faker.address.streetName(),
                };
                await this.findMeUsersService.createUser({
                    ...user,
                    termsAccepted: true,
                });
            }
            Logger.log("Seeded users collection", this.constructor.name);
        } else {
            Logger.log("Users collection is already seeded", this.constructor.name);
        }
    }

    private async checkIfSeederLogExists(key: string): Promise<boolean> {
        return !!(await this.findMeSeederLogModel.findOne({
            key,
            seeded: true,
        }));
    }

    private async createSeederLog(key: string): Promise<void> {
        await this.findMeSeederLogModel.create({
            key,
            seeded: true,
        });
    }
}
