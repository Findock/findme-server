import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoDbModelMock from 'src/tests/mocks/mongoDbModel.mock';
import { FindmeUsersService } from './findme-users.service';
import { FindMeUser } from './schemas/findme-user.schema';

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
