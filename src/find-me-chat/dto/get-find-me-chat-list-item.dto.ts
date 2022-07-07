import { ApiProperty } from "@nestjs/swagger";

import { FindMeChatMessage } from "@/find-me-chat/entities/find-me-chat-message.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

export class GetFindMeChatListItemDto {
    @ApiProperty()
    public lastMessage: FindMeChatMessage;

    @ApiProperty()
    public receiver: FindMeUser;

    @ApiProperty()
    public unreadCount: number;
}
