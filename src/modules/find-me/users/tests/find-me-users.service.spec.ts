import { Test, TestingModule } from '@nestjs/testing';
import { CreateFindMeUserDto } from '@src/modules/find-me/users/dto/create-find-me-user.dto';
import { FindMeUsersService } from '@src/modules/find-me/users/find-me-users.service';
import FindMeUserModelMock from '@src/tests/mocks/models/FindMeUserModelMock';
import FindMeSecurityServiceMock from '@src/tests/mocks/services/FindMeSecurityService.mock';

describe('FindmeUsersService', () => {
  let service: FindMeUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindMeUsersService,
        FindMeUserModelMock,
      ],
    }).useMocker(FindMeSecurityServiceMock).compile();

    service = module.get<FindMeUsersService>(FindMeUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUser - should call model create on user dto', async () => {
    const user: CreateFindMeUserDto = {
      email: 'mail@mail.com',
      password: 'password',
    };

    await service.createUser(user);

    expect((service as any).findMeUserModel.create).toBeCalled();
  });

  it('createFindMeUser - should call model findOne to check if user with provided email exists', async () => {
    const user: CreateFindMeUserDto = {
      email: 'mail@mail.com',
      password: 'password',
    };

    await service.createUser(user);

    expect((service as any).findMeUserModel.findOne).toBeCalled();
    expect((service as any).findMeUserModel.findOne).toBeCalledWith({ email: user.email });
    expect((service as any).findMeUserModel.findOne).toBeCalledTimes(1);
  });

  it('createFindMeUser - should not create user when user with this email is already created', async () => {

    jest.spyOn((service as any).findMeUserModel, 'findOne').mockReturnValue({ _id: 'testid1' });

    const user: CreateFindMeUserDto = {
      email: 'mail@mail.com',
      password: 'password',
    };

    try {
      await service.createUser(user);
    } catch {}

    expect((service as any).findMeUserModel.findOne).toBeCalled();
    expect((service as any).findMeUserModel.findOne).toBeCalledWith({ email: user.email });
    expect((service as any).findMeUserModel.findOne).toBeCalledTimes(1);
    expect((service as any).findMeUserModel.create).toBeCalledTimes(0);
  });
});
