import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FindMeUser, FindMeUserDocument } from '@src/modules/find-me-users/schemas/find-me-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class FindMeUsersService {
  constructor(
    @InjectModel(FindMeUser.name) private readonly findMeUserModel: Model<FindMeUserDocument>
  ) {}
}
