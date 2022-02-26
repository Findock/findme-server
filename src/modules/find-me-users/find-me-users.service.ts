import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FindMeSecurityService } from '@src/modules/find-me-security/find-me-security.service';
import { Model } from 'mongoose';
import { CreateFindMeUserDto } from '@src/modules/find-me-users/dto/create-find-me-user.dto';
import { FindMeUser, FindMeUserDocument } from '@src/modules/find-me-users/schemas/find-me-user.schema';
import errorMessagesConstants from '@src/constants/error-messages.constants';

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
        if (userWithThisEmail !== null) throw new ConflictException([ errorMessagesConstants.USER_WITH_THIS_EMAIL_ALREADY_EXIST ]);

        const encryptedPassword = this.findMeSecurityService.encryptValue(createFindMeUserDto.password);

        return this.findMeUserModel.create({
            ...createFindMeUserDto,
            password: encryptedPassword,
        });
    }

    public async findOneByEmail(email: string): Promise<FindMeUserDocument> {
        return this.findMeUserModel.findOne({ email });
    }

    public async findOneById(id: string): Promise<FindMeUserDocument> {
        return this.findMeUserModel.findById(id);
    }
}
