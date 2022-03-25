import { Global, Module } from "@nestjs/common";

import { FindMeSecurityEncryptionService } from "@/find-me-security/services/find-me-security-encryption.service";

@Global()
@Module({
    providers: [ FindMeSecurityEncryptionService ],
    exports: [ FindMeSecurityEncryptionService ],
})
export class FindMeSecurityModule {}
