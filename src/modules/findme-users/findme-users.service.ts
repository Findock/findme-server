import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindMeUser, FindMeUserDocument } from './schemas/findme-user.schema';

@Injectable()
export class FindmeUsersService {
  constructor(
    @InjectModel(FindMeUser.name) private readonly findMeUserModel: Model<FindMeUserDocument>
  ) {
    findMeUserModel.find();
  }
}
