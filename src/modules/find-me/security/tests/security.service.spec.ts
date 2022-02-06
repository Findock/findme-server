import { Test, TestingModule } from '@nestjs/testing';
import { FindMeSecurityService } from '@src/modules/find-me/security/find-me-security.service';
import ConfigServiceMock from '@src/tests/mocks/services/ConfigService.mock';

describe('SecurityService', () => {
  let service: FindMeSecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindMeSecurityService,
        ConfigServiceMock,
      ],
    }).compile();

    service = module.get<FindMeSecurityService>(FindMeSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('encryptValue - should encrypt value', () => {
    const value = 'test';

    const encrypted = service.encryptValue(value);
    console.log(encrypted);

    expect(value).not.toEqual(encrypted);
  });
});
