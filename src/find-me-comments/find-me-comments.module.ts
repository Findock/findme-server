import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeAnnouncementsModule } from "@/find-me-announcements/find-me-announcements.module";
import { FindMeCommentPhotosController } from "@/find-me-comments/controllers/find-me-comment-photos.controller";
import { FindMeCommentsController } from "@/find-me-comments/controllers/find-me-comments.controller";
import { FindMeComment } from "@/find-me-comments/entities/find-me-comment.entity";
import { FindMeCommentPhoto } from "@/find-me-comments/entities/find-me-comment-photo.entity";
import { FindMeCommentsService } from "@/find-me-comments/services/find-me-comments.service";
import { FindMeCommentPhotosService } from "@/find-me-comments/services/find-me-comments-photos.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FindMeCommentPhoto,
            FindMeComment,
        ]),
        FindMeAnnouncementsModule,
    ],
    providers: [
        FindMeCommentPhotosService,
        FindMeCommentsService,
    ],
    controllers: [
        FindMeCommentPhotosController,
        FindMeCommentsController,
    ],
})
export class FindMeCommentsModule { }
