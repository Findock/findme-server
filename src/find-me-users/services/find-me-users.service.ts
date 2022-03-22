import {
    BadRequestException,
    ConflictException, Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import errorMessagesConstants from "@/find-me-commons/constants/error-messages.constants";
import { FindMeSecurityService } from "@/find-me-security/services/find-me-security.service";
import { CreateFindMeUserDto } from "@/find-me-users/dto/create-find-me-user.dto";
import { UpdateFindMeUserDto } from "@/find-me-users/dto/update-find-me-user.dto";
import { FindMeUser, FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";
import {
    FindMeUserDeleteLog,
    FindMeUserDeleteLogDocument,
} from "@/find-me-users/schemas/find-me-user-delete-log.schema";

@Injectable()
export class FindMeUsersService {
    public constructor(
        @InjectModel(FindMeUser.name) private readonly userModel: Model<FindMeUserDocument>,
        @InjectModel(FindMeUserDeleteLog.name) private readonly userDeleteLogModel: Model<FindMeUserDeleteLogDocument>,
        private readonly securityService: FindMeSecurityService
    ) {}

    public async createUser(
        createFindMeUserDto: CreateFindMeUserDto
    ): Promise<FindMeUserDocument> {
        if (!createFindMeUserDto.termsAccepted) {
            throw new BadRequestException([ errorMessagesConstants.TERMS_NEED_TO_BE_ACCEPTED ]);
        }

        const userWithThisEmail = await this.userModel.findOne({ email: createFindMeUserDto.email });
        if (userWithThisEmail !== null) {
            throw new ConflictException([ errorMessagesConstants.USER_WITH_THIS_EMAIL_ALREADY_EXIST ]);
        }

        const encryptedPassword = this.securityService.encryptValue(createFindMeUserDto.password);

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

    public async anonymizeUserData(userId: string): Promise<void> {
        const anonymizedUserData = {
            email: "",
            password: "",
            name: "deleted",
            phoneNumber: "",
            profileImageUrl: "",
            street: "",
            city: "",
            bio: "",
        };
        await this.userModel.findByIdAndUpdate(userId, anonymizedUserData);
        await this.userDeleteLogModel.create({ user: userId });
    }

    public async updateUserProfileImage(userId: string, imageUrl: string): Promise<FindMeUser> {
        const user = await this.userModel.findByIdAndUpdate(userId,
            { profileImageUrl: imageUrl },
            { new: true }
        ).lean();
        delete user.password;
        return user;
    }

    public async removeUserProfileImage(userId: string): Promise<FindMeUser> {
        const user = await this.userModel.findByIdAndUpdate(userId,
            { profileImageUrl: "" },
            { new: true }
        ).lean();
        delete user.password;
        return user;
    }
}
