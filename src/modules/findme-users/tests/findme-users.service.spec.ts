import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FindmeUsersService } from '@src/modules/findme-users/findme-users.service';
import { FindMeUser } from '@src/modules/findme-users/schemas/findme-user.schema';
import mongoDbModelMock from '@src/tests/mocks/mongoDbModel.mock';

describe('FindmeUsersService', () => {
  let service: FindmeUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindmeUsersService, {
          provide: getModelToken(FindMeUser.name),
          useValue: mongoDbModelMock,
        },
      ],
    }).compile();

    service = module.get<FindmeUsersService>(FindmeUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
