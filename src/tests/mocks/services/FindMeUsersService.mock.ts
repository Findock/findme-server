import { FindMeUsersService } from "@src/modules/find-me/users/find-me-users.service";

export default (token) => {
  if (token === FindMeUsersService) {
    return { createUser: jest.fn() };
  }
};
