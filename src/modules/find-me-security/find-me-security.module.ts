import { Module } from '@nestjs/common';
import { FindMeSecurityService } from '@src/modules/find-me-security/find-me-security.service';

@Module({
    providers: [ FindMeSecurityService ],
    exports: [ FindMeSecurityService ],
})
export class FindMeSecurityModule {}
