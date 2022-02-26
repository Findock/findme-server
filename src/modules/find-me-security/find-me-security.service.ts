import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import CryptoJS from "crypto-js";

@Injectable()
export class FindMeSecurityService {
    public constructor(
        private readonly configService: ConfigService
    ) {}

    public encryptValue(value: string): string {
        return CryptoJS.SHA256(value).toString();
    }
}
