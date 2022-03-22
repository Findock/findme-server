import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

import mailerSubjectsConstants from "@/find-me-mailer/constants/mailer-subjects.constants";

@Injectable()
export class FindMeMailerService {
    public constructor(
        private readonly mailerService: MailerService
    ) {}

    public async sendResetPasswordLink(
        recipientEmail: string,
        name: string,
        resetPasswordLink: string
    ): Promise<void> {
        await this.mailerService.sendMail({
            to: recipientEmail,
            subject: mailerSubjectsConstants.RESET_PASSWORD,
            template: "reset-password",
            context: {
                name,
                resetPasswordLink,
            },
        });
    }
}
