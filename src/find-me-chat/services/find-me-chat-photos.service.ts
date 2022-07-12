import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeChatPhoto } from "@/find-me-chat/entities/find-me-chat-photo.entity";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeChatPhotosService {
    public constructor(
        @InjectRepository(FindMeChatPhoto)
        private chatPhotosRepository: Repository<FindMeChatPhoto>
    ) { }

    public async createChatPhoto(
        user: FindMeUser,
        photoUrl: string
    ): Promise<FindMeChatPhoto> {
        const chatPhoto = this.chatPhotosRepository.create({
            user,
            url: photoUrl,
        });
        await this.chatPhotosRepository.save(chatPhoto);
        return chatPhoto;
    }

    public async findChatPhotoById(id: number): Promise<FindMeChatPhoto> {
        const photo = await this.chatPhotosRepository.findOne({ where: { id } });
        if (!photo) throw new BadRequestException([ ErrorMessagesConstants.PHOTO_DOES_NOT_EXIST ]);
        return photo;
    }
}
