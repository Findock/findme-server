import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import faker from "faker";
import { Repository } from "typeorm";

import { StringConstants } from "@/find-me-commons/constants/string.constants";
import { FindMeSeederService } from "@/find-me-db/services/find-me-seeder.service";
import { FindMeSecurityEncryptionService } from "@/find-me-security/services/find-me-security-encryption.service";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeUserSeederService {
    private seedKey = "users";
    private usersToSeed = 51;
    private emailPrefix = "bunia";
    private examplePassword = "bunia1";
    private examplePhone = "+48 111 222 333";

    public constructor(
        @InjectRepository(FindMeUser)
        private usersRepository: Repository<FindMeUser>,
        private seederService: FindMeSeederService,
        private securityEncryptionService: FindMeSecurityEncryptionService,
    ) {
        if (!this.seederService.isSeedingEnabled()) return;
        this.seed();
    }

    public async seed(): Promise<void> {
        if (!(await this.seederService.isSeeded(this.seedKey))) {
            for (let i = 0; i < this.usersToSeed; i++) {
                const user = this.usersRepository.create({
                    name: faker.name.firstName() + " " + faker.name.lastName(),
                    email: this.emailPrefix + (i > 0 ? i : "") + StringConstants.AT_GMAIL_COM,
                    password: this.securityEncryptionService.encryptValue(this.examplePassword),
                    phoneNumber: this.examplePhone,
                    profileImageUrl: "",
                    bio: faker.lorem.words(10),
                    city: faker.address.city(),
                    street: faker.address.streetName(),
                });
                await this.usersRepository.save(user);
            }
            this.seederService.flagAsSeeded(this.seedKey);
        }
    }
}
