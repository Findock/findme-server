import { Global, Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

import { FindMeMailerService } from "@/find-me-mailer/services/find-me-mailer.service";

@Global()
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP_HOST,
                port: 587,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            defaults: { from: "FindMe Notify <findmenotify@gmail.com>" },
            template: {
                dir: process.cwd() + "/dist/find-me-mailer/templates/",
                adapter: new HandlebarsAdapter(),
                options: { strict: true },
            },
        }),
    ],
    providers: [ FindMeMailerService ],
    exports: [ FindMeMailerService ],
})
export class FindMeMailerModule {}
