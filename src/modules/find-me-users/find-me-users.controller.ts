import { Controller } from '@nestjs/common';
import pathConstants from '@src/constants/path.constants';

@Controller(pathConstants.USERS)
export class FindMeUsersController {}
