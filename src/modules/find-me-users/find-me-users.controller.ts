import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import pathConstants from "@src/constants/path.constants";
import { FindMeUsersService } from "@src/modules/find-me-users/find-me-users.service";
import { CreateFindMeUserDto } from "@src/modules/find-me-users/dto/create-find-me-user.dto";
import { FindMeUser, FindMeUserDocument } from "@src/modules/find-me-users/schemas/find-me-user.schema";
import ErrorExceptionDto from "@src/dto/error-exception.dto";
import { JwtAuthGuard } from "@src/modules/find-me-auth/find-me-jwt-auth.guard";
import { CurrentUser } from "@src/modules/find-me-auth/find-me-current-user.decorator";
import UnauthorizedExceptionDto from "@src/dto/unauthorized-exception.dto";
import { GetFindMeUserDto } from "@src/modules/find-me-users/dto/get-find-me-user.dto copy";

@ApiTags("users")
@Controller(pathConstants.USERS)
export class FindMeUsersController {
    public constructor(
        private readonly findMeUsersService: FindMeUsersService
    ) { }

    @ApiOperation({
        summary: "Create new user",
        description: "Only allows to create a new user when email is unique",
    })
    @ApiCreatedResponse({
        description: "User was successfully created",
        type: FindMeUser,
    })
    @ApiBadRequestResponse({
        description: "Not all fields were presented or form validation errors",
        type: FindMeUser,
    })
    @ApiConflictResponse({
        description: "User with provided email exists",
        type: ErrorExceptionDto,
    })
    @Post()
    public async createFindMeUser(
        @Body() createFindMeUserDto: CreateFindMeUserDto
    ): Promise<FindMeUserDocument> {
        return this.findMeUsersService.createUser(createFindMeUserDto);
    }

    @ApiOperation({
        summary: "Get authorized user account information",
        description: "You can access user information via authorization token",
    })
    @ApiOkResponse({
        description: "",
        type: GetFindMeUserDto,
    })
    @ApiUnauthorizedResponse({
        description: "",
        type: UnauthorizedExceptionDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(pathConstants.ME)
    public async getMe(
        @CurrentUser() user
    ): Promise<FindMeUserDocument> {
        return user;
    }
}
