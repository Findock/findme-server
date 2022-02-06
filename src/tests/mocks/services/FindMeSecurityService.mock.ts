import { FindMeSecurityService } from "@src/modules/find-me/security/find-me-security.service";

export default (token) => {
  if (token === FindMeSecurityService) {
    return { encryptValue: jest.fn() };
  }
};
