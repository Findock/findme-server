import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FindMeChatController } from "@/find-me-chat/controllers/find-me-chat.controller";
import { FindMeChatMessage } from "@/find-me-chat/entities/find-me-chat-message.entity";
import { FindMeChatService } from "@/find-me-chat/services/find-me-chat.service";
import { FindMeUsersModule } from "@/find-me-users/find-me-users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ FindMeChatMessage ]),
        FindMeUsersModule,
    ],
    providers: [ FindMeChatService ],
    controllers: [ FindMeChatController ],
    exports: [ FindMeChatService ],
})
export class FindMeChatModule { }
