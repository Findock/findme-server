import { getModelToken } from '@nestjs/mongoose';
import { FindMeUser } from '@src/modules/find-me/users/schemas/find-me-user.schema';
import MongoDbModelMock from './MongoDbModel.mock';

export default {
  provide: getModelToken(FindMeUser.name),
  useValue: MongoDbModelMock,
};
