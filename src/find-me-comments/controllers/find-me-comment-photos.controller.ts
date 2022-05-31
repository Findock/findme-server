import { ClassSerializerInterceptor, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    ApiBearerAuth, ApiBody,
    ApiConsumes, ApiOkResponse,
    ApiOperation, ApiTags, ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { FindMeCommentPhoto } from "@/find-me-comments/entities/find-me-comment-photo.entity";
import { FindMeCommentPhotosService } from "@/find-me-comments/services/find-me-comments-photos.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeStorageCommentPhotoInterceptor }
    from "@/find-me-storage/interceptors/find-me-storage-comment-photo.interceptor";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@ApiTags(ApiTagsConstants.COMMENT_PHOTOS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.COMMENT_PHOTOS)
export class FindMeCommentPhotosController {
    public constructor(
        private commentPhotosService: FindMeCommentPhotosService
    ) { }

    @ApiOperation({
        summary: "Upload one comment photo",
        description: "Upload one comment photo and returns its object",
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization token",
        type: UnauthorizedExceptionDto,
    })
    @ApiOkResponse({
        description: "Successfully uploaded photo and returns photo object",
        type: FindMeCommentPhoto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FindMeStorageCommentPhotoInterceptor)
    @Post(PathConstants.UPLOAD)
    public async uploadAnnouncementPhoto(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeCommentPhoto> {
        return this.commentPhotosService.createCommentPhoto(
            user,
            file.path.replaceAll("\\", "/")
        );
    }
}
