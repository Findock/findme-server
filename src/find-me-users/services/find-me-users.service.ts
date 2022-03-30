import {
    BadRequestException,
    ConflictException, Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeSecurityEncryptionService } from "@/find-me-security/services/find-me-security-encryption.service";
import { CreateFindMeUserDto } from "@/find-me-users/dto/create-find-me-user.dto";
import { UpdateFindMeUserDto } from "@/find-me-users/dto/update-find-me-user.dto";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeUsersService {
    public constructor(
        @InjectRepository(FindMeUser)
        private usersRepository: Repository<FindMeUser>,
        private readonly securityEncryptionService: FindMeSecurityEncryptionService
    ) {}

    public async createUser(
        createFindMeUserDto: CreateFindMeUserDto
    ): Promise<FindMeUser> {
        if (!createFindMeUserDto.termsAccepted) {
            throw new BadRequestException([ ErrorMessagesConstants.TERMS_NEED_TO_BE_ACCEPTED ]);
        }

        const userWithThisEmail = await this.usersRepository.findOne({ where: { email: createFindMeUserDto.email } });

        if (userWithThisEmail) {
            throw new ConflictException([ ErrorMessagesConstants.USER_WITH_THIS_EMAIL_ALREADY_EXIST ]);
        }

        const encryptedPassword = this.securityEncryptionService.encryptValue(createFindMeUserDto.password);

        const user = this.usersRepository.create({
            ...createFindMeUserDto,
            password: encryptedPassword,
        });
        this.usersRepository.save(user);
        return user;
    }

    public async updateUser(user: FindMeUser, updateDto: UpdateFindMeUserDto): Promise<FindMeUser> {
        const { bio, city, name, street, phoneNumber } = updateDto;
        user.bio = bio;
        user.city = city;
        user.name = name;
        user.street = street;
        user.phoneNumber = phoneNumber;
        await this.usersRepository.save(user);
        return user;
    }

    public async findOneByEmail(email: string): Promise<FindMeUser> {
        return this.usersRepository.findOne({ where: { email } });
    }

    public async findOneById(id: number): Promise<FindMeUser> {
        return this.usersRepository.findOne({ where: { id } });
    }

    public async updateUserPassword(
        user: FindMeUser,
        oldPassword: string,
        newPassword: string
    ): Promise<FindMeUser> {
        const fullUser = await this.usersRepository.findOne({ where: { id: user.id } });
        if(fullUser.password !== this.securityEncryptionService.encryptValue(oldPassword)) {
            throw new BadRequestException([ ErrorMessagesConstants.INVALID_OLD_PASSWORD ]);
        }
        fullUser.password = this.securityEncryptionService.encryptValue(newPassword);
        await this.usersRepository.save(fullUser);
        return fullUser;
    }

    public async forceUpdateUserPassword(user: FindMeUser, newPassword: string): Promise<FindMeUser> {
        user.password = newPassword;
        this.usersRepository.save(user);
        return user;
    }
}
