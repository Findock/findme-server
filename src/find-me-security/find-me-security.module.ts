import { Global, Module } from "@nestjs/common";

import { FindMeSecurityService } from "@/find-me-security/services/find-me-security.service";

@Global()
@Module({
    providers: [ FindMeSecurityService ],
    exports: [ FindMeSecurityService ],
})
export class FindMeSecurityModule {}
