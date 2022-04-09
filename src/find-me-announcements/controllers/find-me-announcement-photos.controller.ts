import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { FindMeAnnouncementPhoto } from "@/find-me-announcements/entities/find-me-announcement-photo.entity";
import { FindMeAnnouncementPhotosService } from "@/find-me-announcements/services/find-me-announcement-photos.service";
import { ApiTagsConstants } from "@/find-me-commons/constants/api-tags.constants";
import { PathConstants } from "@/find-me-commons/constants/path.constants";
import { CurrentUser } from "@/find-me-security/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@/find-me-security/guards/find-me-jwt-auth.guard";
import { FindMeStorageAnnouncementPhotoInterceptor }
    from "@/find-me-storage/interceptors/find-me-storage-announcement-photo.interceptor";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@ApiTags(ApiTagsConstants.ANNOUNCEMENT_PHOTOS)
@Controller(PathConstants.ANNOUNCEMENT_PHOTOS)
export class FindMeAnnouncementPhotosController {
    public constructor(
        private announcementPhotosService: FindMeAnnouncementPhotosService
    ) { }

    @ApiOperation({
        summary: "Upload one announcement photo",
        description: "Upload one announcement photo and returns its object",
    })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FindMeStorageAnnouncementPhotoInterceptor)
    @Post()
    public async uploadAnnouncementPhoto(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: FindMeUser
    ): Promise<FindMeAnnouncementPhoto> {
        return this.announcementPhotosService.createAnnouncementPhoto(user, file.path);
    }
}
