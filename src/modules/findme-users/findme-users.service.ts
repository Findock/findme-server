import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FindMeUser, FindMeUserDocument } from '@src/modules/findme-users/schemas/findme-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class FindmeUsersService {
  constructor(
    @InjectModel(FindMeUser.name) private readonly findMeUserModel: Model<FindMeUserDocument>
  ) {
    findMeUserModel.find();
  }
}
