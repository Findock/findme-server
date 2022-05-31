import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeCommentPhoto } from "@/find-me-comments/entities/find-me-comment-photo.entity";
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
}
