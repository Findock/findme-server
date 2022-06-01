import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { CreateFindMeCommentDto } from "@/find-me-comments/dto/create-find-me-comment.dto";
import { FindMeComment } from "@/find-me-comments/entities/find-me-comment.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

export class FindMeCommentsService {
    public constructor(
        @InjectRepository(FindMeComment)
        private commentsRepository: Repository<FindMeComment>
    ) { }

    public async createComment(
        creator: FindMeUser,
        createDto: CreateFindMeCommentDto
    ): Promise<FindMeComment> {
        const commentedAnnouncement = { id: createDto.commentedAnnouncementId };
        const photos = createDto.photosIds
            .map(photoIds => ({ id: photoIds }));

        const createdComment = this.commentsRepository.create({
            comment: createDto.comment || "",
            locationLon: createDto.locationLon || 0,
            locationLat: createDto.locationLat || 0,
            commentedAnnouncement,
            photos,
            creator,
        });
        await this.commentsRepository.save(createdComment);
        return createdComment;
    }

    public async getCommentsToAnnouncement(announcement: FindMeAnnouncement): Promise<FindMeComment[]> {
        return this.commentsRepository.find({
            where: { commentedAnnouncement: announcement.id },
            relations: [
                "commentedAnnouncement",
                "photos",
                "creator",
            ],
        });
    }
}
