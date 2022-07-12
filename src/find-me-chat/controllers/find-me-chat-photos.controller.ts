import { ClassSerializerInterceptor, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    ApiBearerAuth, ApiBody,
    ApiConsumes, ApiOkResponse,
    ApiOperation, ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeChatPhotosService } from "@/find-me-chat/services/find-me-chat-photos.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeStorageCommentPhotoInterceptor }
    from "@/find-me-storage/interceptors/find-me-storage-comment-photo.interceptor";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@ApiTags(ApiTagsConstants.CHAT_PHOTOS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.CHAT_PHOTOS)
export class FindMeChatPhotosController {
    public constructor(
        private chatPhotosService: FindMeChatPhotosService
    ) { }

    @ApiOperation({
        summary: "Upload one chat photo",
        description: "Upload one chat photo and returns its object",
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
        type: FindMeAnnouncementPhoto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FindMeStorageCommentPhotoInterceptor)
    @Post(PathConstants.UPLOAD)
    public async uploadChatPhoto(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeAnnouncementPhoto> {
        return this.chatPhotosService.createChatPhoto(
            user,
            file.path.replaceAll("\\", "/")
        );
    }
}
