import { Test, TestingModule } from '@nestjs/testing';
import { FindMeUsersController } from '@src/modules/find-me-users/find-me-users.controller';

describe('FindmeUsersController', () => {
  let controller: FindMeUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ controllers: [ FindMeUsersController ] }).compile();

    controller = module.get<FindMeUsersController>(FindMeUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
