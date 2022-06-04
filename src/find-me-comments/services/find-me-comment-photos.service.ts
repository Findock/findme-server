import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeCommentPhoto } from "@/find-me-comments/entities/find-me-comment-photo.entity";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

export class FindMeCommentPhotosService {
    public constructor(
        @InjectRepository(FindMeCommentPhoto)
        private commentPhotosRepository: Repository<FindMeCommentPhoto>
    ) { }

    public async createCommentPhoto(
        user: FindMeUser,
        photoUrl: string
    ): Promise<FindMeCommentPhoto> {
        const commentPhoto = this.commentPhotosRepository.create({
            user,
            url: photoUrl,
        });
        await this.commentPhotosRepository.save(commentPhoto);
        return commentPhoto;
    }

    public async getCommentPhotoById(photoId: number): Promise<FindMeCommentPhoto> {
        const photo = this.commentPhotosRepository.findOne(photoId);
        if (!photo) throw new BadRequestException([ ErrorMessagesConstants.COMMENT_PHOTO_DOES_NOT_EXIST ]);
        return photo;
    }
}
