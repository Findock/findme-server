import { ClassSerializerInterceptor, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    ApiBearerAuth, ApiBody,
    ApiConsumes, ApiOkResponse,
    ApiOperation, ApiTags,
    ApiUnauthorizedResponse,
}
    from "@nestjs/swagger";

import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeAnnouncementPhotosService } from "@/find-me-announcements/services/find-me-announcement-photos.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { UnauthorizedExceptionDto } from "@/find-me-commons/dto/unauthorized-exception.dto";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeStorageAnnouncementPhotoInterceptor }
    from "@/find-me-storage/interceptors/find-me-storage-announcement-photo.interceptor";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@ApiTags(ApiTagsConstants.ANNOUNCEMENT_PHOTOS)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(PathConstants.ANNOUNCEMENT_PHOTOS)
export class FindMeAnnouncementPhotosController {
    public constructor(
        private announcementPhotosService: FindMeAnnouncementPhotosService
    ) { }

    @ApiOperation({
        summary: "Upload one announcement photo",
        description: "Upload one announcement photo and returns its object",
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
    @UseInterceptors(FindMeStorageAnnouncementPhotoInterceptor)
    @Post(PathConstants.UPLOAD)
    public async uploadAnnouncementPhoto(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeAnnouncementPhoto> {
        return this.announcementPhotosService.createAnnouncementPhoto(user, file.path);
    }
}
