import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

import { MailerSubjectsConstants } from "@/find-me-mailer/constants/MailerSubjectsConstants";

@Injectable()
export class FindMeMailerService {
    public constructor(
        private mailerService: MailerService
    ) {}

    public async sendResetPasswordLinkMail(
        recipientEmail: string,
        name: string,
        resetPasswordLink: string
    ): Promise<void> {
        await this.mailerService.sendMail({
            to: recipientEmail,
            subject: MailerSubjectsConstants.RESET_PASSWORD,
            template: "reset-password",
            context: {
                name,
                resetPasswordLink,
            },
        });
    }
}
