import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CryptoJS from 'crypto-js';

@Injectable()
export class FindMeSecurityService {
  public constructor(
    private readonly configService: ConfigService
  ) {}

  public encryptValue(value: string): string {
    return CryptoJS.AES.encrypt(value, this.configService.get<string>('security.encryptKey')).toString();
  }
}
