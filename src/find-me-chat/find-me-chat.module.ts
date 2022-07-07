import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeChatController } from "@/find-me-chat/controllers/find-me-chat.controller";
import { FindMeCharArchiveController } from "@/find-me-chat/controllers/find-me-chat-archive.controller";
import { FindMeChatArchive } from "@/find-me-chat/entities/find-me-chat-archive.entity";
import { FindMeChatMessage } from "@/find-me-chat/entities/find-me-chat-message.entity";
import { FindMeChatService } from "@/find-me-chat/services/find-me-chat.service";
import { FindMeChatArchiveService } from "@/find-me-chat/services/find-me-chat-archive.service";
import { FindMeUsersModule } from "@/find-me-users/find-me-users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FindMeChatMessage,
            FindMeChatArchive,
        ]),
        FindMeUsersModule,
    ],
    providers: [
        FindMeChatService,
        FindMeChatArchiveService,
    ],
    controllers: [
        FindMeChatController,
        FindMeCharArchiveController,
    ],
    exports: [
        FindMeChatService,
        FindMeChatArchiveService,
    ],
})
export class FindMeChatModule { }
