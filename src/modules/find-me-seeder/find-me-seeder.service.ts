import { Injectable, Logger } from '@nestjs/common';
import { FindMeUsersService } from '@src/modules/find-me-users/find-me-users.service';
import { FindMeUser } from '@src/modules/find-me-users/schemas/find-me-user.schema';
import faker from 'faker';
import { FindMeSecurityService } from '@src/modules/find-me-security/find-me-security.service';
import { InjectModel } from '@nestjs/mongoose';
import { FindMeSeederLog, FindMeSeederLogDocument } from '@src/modules/find-me-seeder/schemas/find-me-seeder-log';
import { Model } from 'mongoose';
import seederKeysConstants from '@src/modules/find-me-seeder/constants/seeder-keys.constants';
import { ConfigService } from '@nestjs/config';
import environmentConstants from '@src/constants/environment.constants';

@Injectable()
export class FindMeSeederService {
  constructor(
    @InjectModel(FindMeSeederLog.name) private readonly findMeSeederLogModel: Model<FindMeSeederLogDocument>,
    private readonly findMeUsersService: FindMeUsersService,
    private readonly findMeSecurityService: FindMeSecurityService,
    private readonly configService: ConfigService
  ) {
    if (![
      environmentConstants.DOCKER,
      environmentConstants.LOCAL,
    ].includes(this.configService.get<string>('env'))) {
      Logger.log('Seeder service is disabled in production', this.constructor.name);
      return;
    }

    this.seedFindMeUsers(configService.get<number>('seeder.usersSeedCount')).then();
  }

  public async seedFindMeUsers(amount: number): Promise<void> {
    if (!await this.checkIfSeederLogExists(seederKeysConstants.USERS)) {
      await this.createSeederLog(seederKeysConstants.USERS);
      for (let i = 0; i < amount; i++) {
        const user: FindMeUser = {
          name: faker.name.firstName() + ' ' + faker.name.lastName(),
          email: 'u' + i + '@email.com',
          password: this.findMeSecurityService.encryptValue('password'),
          phoneNumber: faker.phone.phoneNumber(),
          lastLogin: new Date(),
          created: new Date(),
          profileImageUrl: 'https://picsum.photos/300/300',
        };
        await this.findMeUsersService.createUser(user);
      }
      Logger.log('Seeded users collection', this.constructor.name);
    } else {
      Logger.log('Users collection is already seeded', this.constructor.name);
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
