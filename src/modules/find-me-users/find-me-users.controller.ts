import { Body, Controller, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import pathConstants from '@src/constants/path.constants';
import { FindMeUsersService } from '@src/modules/find-me-users/find-me-users.service';
import { CreateFindMeUserDto } from '@src/modules/find-me-users/dto/create-find-me-user.dto';
import { FindMeUser, FindMeUserDocument } from '@src/modules/find-me-users/schemas/find-me-user.schema';

@ApiTags('users')
@Controller(pathConstants.USERS)
export class FindMeUsersController {
  public constructor(
    private readonly findMeUsersService: FindMeUsersService
  ) {}

  @ApiOperation({
    summary: 'Create new user',
    description: 'Only allows to create a new user when email is unique',
  })
  @ApiCreatedResponse({
    description: 'User was successfully created',
    type: FindMeUser,
  })
  @ApiConflictResponse({ description: 'User with provided email exists' })
  @Post()
  public async createFindMeUser(
    @Body() createFindMeUserDto: CreateFindMeUserDto
  ): Promise<FindMeUserDocument> {
    return this.findMeUsersService.createUser(createFindMeUserDto);
  }
}
