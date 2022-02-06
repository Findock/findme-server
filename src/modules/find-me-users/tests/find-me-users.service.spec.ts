import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FindMeUsersService } from '@src/modules/find-me-users/find-me-users.service';
import { FindMeUser } from '@src/modules/find-me-users/schemas/find-me-user.schema';
import mongoDbModelMock from '@src/tests/mocks/mongoDbModel.mock';

describe('FindmeUsersService', () => {
  let service: FindMeUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindMeUsersService, {
          provide: getModelToken(FindMeUser.name),
          useValue: mongoDbModelMock,
        },
      ],
    }).compile();

    service = module.get<FindMeUsersService>(FindMeUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
