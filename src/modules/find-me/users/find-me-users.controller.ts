import { Body, Controller, Post } from '@nestjs/common';
import pathConstants from '@src/constants/path.constants';
import { CreateFindMeUserDto } from '@src/modules/find-me/users/dto/create-find-me-user.dto';
import { FindMeUsersService } from '@src/modules/find-me/users/find-me-users.service';
import { FindMeUserDocument } from '@src/modules/find-me/users/schemas/find-me-user.schema';

@Controller(pathConstants.USERS)
export class FindMeUsersController {
  public constructor(
    private readonly findMeUsersService: FindMeUsersService
  ) {}

  @Post()
  public async createFindMeUser(
    @Body() createFindMeUserDto: CreateFindMeUserDto
  ): Promise<FindMeUserDocument> {
    return this.findMeUsersService.createUser(createFindMeUserDto);
  }
}
