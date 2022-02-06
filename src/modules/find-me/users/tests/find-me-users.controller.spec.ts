import { Test, TestingModule } from '@nestjs/testing';
import { CreateFindMeUserDto } from '@src/modules/find-me/users/dto/create-find-me-user.dto';
import { FindMeUsersController } from '@src/modules/find-me/users/find-me-users.controller';
import FindMeUsersServiceMock from '@src/tests/mocks/services/FindMeUsersService.mock';

describe('FindmeUsersController', () => {
  let controller: FindMeUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test
      .createTestingModule({ controllers: [ FindMeUsersController ] })
      .useMocker(FindMeUsersServiceMock).compile();

    controller = module.get<FindMeUsersController>(FindMeUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createFindMeUser - should call user service createUser with user dto', async () => {
    const user: CreateFindMeUserDto = {
      email: 'mail@mail.com',
      password: 'password',
    };

    await controller.createFindMeUser(user);

    expect((controller as any).findMeUsersService.createUser).toBeCalled();
    expect((controller as any).findMeUsersService.createUser).toBeCalledWith(user);
    expect((controller as any).findMeUsersService.createUser).toBeCalledTimes(1);
  });
});
