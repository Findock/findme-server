import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FindMeSecurityService } from '@src/modules/find-me/security/find-me-security.service';
import { CreateFindMeUserDto } from '@src/modules/find-me/users/dto/create-find-me-user.dto';
import findMeUserAlreadyExistException from '@src/modules/find-me/users/exceptions/find-me-user-already-exist.exception';
import { FindMeUser, FindMeUserDocument } from '@src/modules/find-me/users/schemas/find-me-user.schema';
import { Model } from 'mongoose';

@Injectable()
export class FindMeUsersService {
  public constructor(
    @InjectModel(FindMeUser.name) private readonly findMeUserModel: Model<FindMeUserDocument>,
    private readonly findMeSecurityService: FindMeSecurityService
  ) {}

  public async createUser(
    createFindMeUserDto: CreateFindMeUserDto
  ): Promise<FindMeUserDocument> {
    const userWithThisEmail = await this.findMeUserModel.findOne({ email: createFindMeUserDto.email });
    if (!!userWithThisEmail) throw new ConflictException(findMeUserAlreadyExistException);

    const encryptedPassword = this.findMeSecurityService.encryptValue(createFindMeUserDto.password);

    return this.findMeUserModel.create({
      ...createFindMeUserDto,
      password: encryptedPassword,
    });
  }
}
