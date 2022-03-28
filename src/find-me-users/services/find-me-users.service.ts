import {
    BadRequestException,
    ConflictException, Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeSecurityEncryptionService } from "@/find-me-security/services/find-me-security-encryption.service";
import { CreateFindMeUserDto } from "@/find-me-users/dto/create-find-me-user.dto";
import { GetFindMeUserDto } from "@/find-me-users/dto/get-find-me-user.dto";
import { UpdateFindMeUserDto } from "@/find-me-users/dto/update-find-me-user.dto";
import { FindMeUser, FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";

@Injectable()
export class FindMeUsersService {
    public constructor(
        @InjectModel(FindMeUser.name) private readonly userModel: Model<FindMeUserDocument>,
        private readonly securityEncryptionService: FindMeSecurityEncryptionService
    ) {}

    public async createUser(
        createFindMeUserDto: CreateFindMeUserDto
    ): Promise<FindMeUserDocument> {
        if (!createFindMeUserDto.termsAccepted) {
            throw new BadRequestException([ ErrorMessagesConstants.TERMS_NEED_TO_BE_ACCEPTED ]);
        }

        const userWithThisEmail = await this.userModel.findOne({ email: createFindMeUserDto.email });
        if (userWithThisEmail !== null) {
            throw new ConflictException([ ErrorMessagesConstants.USER_WITH_THIS_EMAIL_ALREADY_EXIST ]);
        }

        const encryptedPassword = this.securityEncryptionService.encryptValue(createFindMeUserDto.password);

        return this.userModel.create({
            ...createFindMeUserDto,
            password: encryptedPassword,
        });
    }

    public async updateUser(userId: string, updateDto: UpdateFindMeUserDto): Promise<FindMeUser> {
        const { bio, city, name, street, phoneNumber } = updateDto;
        const user = await this.userModel.findByIdAndUpdate(userId, {
            bio,
            city,
            name,
            street,
            phoneNumber,
        }, { new: true }).lean();
        delete user.password;
        return user;
    }

    public async findOneByEmail(email: string): Promise<FindMeUserDocument> {
        return this.userModel.findOne({ email });
    }

    public async findOneById(id: string): Promise<FindMeUserDocument> {
        return this.userModel.findById(id);
    }

    public async updateUserPassword(
        userId: string,
        oldPassword: string,
        newPassword: string
    ): Promise<FindMeUser> {
        const user = await this.userModel.findById(userId).lean();
        if(user.password !== this.securityEncryptionService.encryptValue(oldPassword)) {
            throw new BadRequestException([ ErrorMessagesConstants.INVALID_OLD_PASSWORD ]);
        }
        await this.userModel.findByIdAndUpdate(
            userId,
            { password: this.securityEncryptionService.encryptValue(newPassword) }
        );
        delete user.password;
        return user;
    }

    public async getOtherUser(userId: string): Promise<GetFindMeUserDto> {
        const user = await this.userModel.findById(userId).lean();
        if (!user) throw new BadRequestException([ ErrorMessagesConstants.USER_WITH_THIS_ID_DOES_NOT_EXIST ]);
        delete user.password;
        return user;
    }
}
