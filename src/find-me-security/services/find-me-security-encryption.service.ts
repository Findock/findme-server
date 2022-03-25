import { Injectable } from "@nestjs/common";
import CryptoJS from "crypto-js";

@Injectable()
export class FindMeSecurityEncryptionService {
    public encryptValue(value: string): string {
        return CryptoJS.SHA256(value).toString();
    }
}
