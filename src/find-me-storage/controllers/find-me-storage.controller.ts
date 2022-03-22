import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CurrentUser } from "@src/find-me-auth/decorators/find-me-current-user.decorator";
import { JwtAuthGuard } from "@src/find-me-auth/guards/find-me-jwt-auth.guard";
import pathConstants from "@src/find-me-commons/constants/path.constants";
import UnauthorizedExceptionDto from "@src/find-me-commons/dto/unauthorized-exception.dto";
import { FindMeUser, FindMeUserDocument } from "@src/find-me-users/schemas/find-me-user.schema";
import { FindMeUsersService } from "@src/find-me-users/services/find-me-users.service";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";

@ApiTags("storage")
@Controller(pathConstants.STORAGE)
export class FindMeStorageController {
    public constructor(
        private readonly usersService: FindMeUsersService
    ) {}

    @ApiOperation({
        summary: "Upload new profile image for user",
        description: "Uploads and then updates user profile image url in user object",
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
    @ApiCreatedResponse({
        description: "Image was uploaded and returns updated user object",
        type: FindMeUser,
    })
    @ApiUnauthorizedResponse({
        description: "Bad authorization",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @Post(pathConstants.PROFILE_IMAGE)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: "./storage/profile-images",
            filename: (req, file, callback) => {
                const fileExtName = extname(file.originalname);
                const fileName = uuid();
                callback(null, `${fileName}-profile-image${fileExtName}`);
            },
        }),
    }))
    public async uploadNewProfileImageForUser(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: FindMeUserDocument
    ): Promise<FindMeUser> {
        const imageUrl = `/${file.path}`;
        return this.usersService.updateUserProfileImage(user._id, imageUrl);
    }
}
