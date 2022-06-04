import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeAnnouncement } from "@/find-me-announcements/entities/find-me-announcement.entity";
import { CreateFindMeCommentDto } from "@/find-me-comments/dto/create-find-me-comment.dto";
import { EditFindMeCommentDto } from "@/find-me-comments/dto/edit-find-me-comment.dto";
import { FindMeComment } from "@/find-me-comments/entities/find-me-comment.entity";
import { FindMeCommentPhotosService } from "@/find-me-comments/services/find-me-comment-photos.service";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

export class FindMeCommentsService {
    public constructor(
        @InjectRepository(FindMeComment)
        private commentsRepository: Repository<FindMeComment>,
        private commentPhotosService: FindMeCommentPhotosService
    ) { }

    public async createComment(
        creator: FindMeUser,
        createDto: CreateFindMeCommentDto
    ): Promise<FindMeComment> {
        const commentedAnnouncement = { id: createDto.commentedAnnouncementId };
        const photos = await Promise.all(createDto.photosIds
            .map(photoIds => this.commentPhotosService.getCommentPhotoById(photoIds)));

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

    public async updateComment(
        comment: FindMeComment,
        editDto: EditFindMeCommentDto,
        updatingUser: FindMeUser
    ): Promise<FindMeComment> {
        if (comment.creator.id !== updatingUser.id) throw new UnauthorizedException();

        const photos = await Promise.all(editDto.photosIds
            .map(photoIds => this.commentPhotosService.getCommentPhotoById(photoIds)));

        comment.comment = editDto.comment;
        comment.locationLon = Number(editDto.locationLon) || 0;
        comment.locationLat = Number(editDto.locationLat) || 0;
        comment.photos = photos;

        await this.commentsRepository.save(comment);
        return comment;
    }

    public async deleteComment(
        comment: FindMeComment,
        commentedAnnouncement: FindMeAnnouncement,
        deletingUser: FindMeUser
    ): Promise<void> {
        if (comment.creator.id !== deletingUser.id && commentedAnnouncement.creator.id !== deletingUser.id) {
            throw new UnauthorizedException();
        }
        comment.archived = true;
        this.commentsRepository.save(comment);
    }

    public async getCommentByCommentId(commentId: number): Promise<FindMeComment> {
        const comment = await this.commentsRepository.findOne(
            commentId,
            {
                relations: [
                    "commentedAnnouncement",
                    "photos",
                    "creator",
                ],
            }
        );
        if (!comment) throw new BadRequestException([ ErrorMessagesConstants.COMMENT_DOES_NOT_EXIST ]);
        return comment;
    }

    public async getCommentsToAnnouncement(announcement: FindMeAnnouncement): Promise < FindMeComment[] > {
        const comments = await this.commentsRepository.find({
            where: {
                commentedAnnouncement: announcement.id,
                archived: false,
            },
            relations: [
                "commentedAnnouncement",
                "photos",
                "creator",
            ],
        });
        return comments.reverse();
    }
}
