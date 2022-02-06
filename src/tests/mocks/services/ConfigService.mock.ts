import { ConfigService } from '@nestjs/config';

export default {
  provide: ConfigService,
  useValue: {
    get: jest.fn((key: string) => {
      if (key === 'security.encryptKey') {
        return 'encryptKey';
      }
      if (key === 'mongodb.uri') {
        return 'mongodb://test:27017/test';
      }
      return null;
    }),
  },
};
