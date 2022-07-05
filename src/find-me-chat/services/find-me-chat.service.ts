import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateFindMeChatMessageDto } from "@/find-me-chat/dto/create-find-me-chat-message.dto";
import { GetFindMeChatListItemDto } from "@/find-me-chat/dto/get-find-me-chat-list-item.dto";
import { FindMeChatMessage } from "@/find-me-chat/entities/find-me-chat-message.entity";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeChatService {
    public constructor(
        @InjectRepository(FindMeChatMessage)
        private chatMessagesRepository: Repository<FindMeChatMessage>
    ) { }

    public async createNewChatMessage(
        sender: FindMeUser,
        receiver: FindMeUser,
        messageDto: CreateFindMeChatMessageDto
    ): Promise<FindMeChatMessage> {
        const message = this.chatMessagesRepository.create({
            ...messageDto,
            receiver,
            sender,
        });
        await this.chatMessagesRepository.save(message);
        return message;
    }

    public async getChatMessagesWithUser(
        sender: FindMeUser,
        receiver: FindMeUser
    ): Promise<FindMeChatMessage[]> {
        const sendedMessages = await this.chatMessagesRepository.find({
            where: {
                sender: sender.id,
                receiver: receiver.id,
            },
            relations: [
                "sender",
                "receiver",
            ],
        });
        const receivedMessages = await this.chatMessagesRepository.find({
            where: {
                sender: receiver.id,
                receiver: sender.id,
            },
            relations: [
                "sender",
                "receiver",
            ],
        });
        await Promise.all(receivedMessages.map((message) => this.markMessageAsReceived(message)));
        return [ ...receivedMessages, ...sendedMessages ].sort((a, b) => {
            return b.sentDate.getTime() - a.sentDate.getTime();
        });
    }

    public async getUserMessagesList(user: FindMeUser): Promise<GetFindMeChatListItemDto[]> {
        let sentMessages = await this.chatMessagesRepository.find({
            where: { sender: user.id },
            relations: [
                "sender",
                "receiver",
            ],
        });
        sentMessages = sentMessages.sort((a, b) => {
            return b.sentDate.getTime() - a.sentDate.getTime();
        });
        const receiversIds = sentMessages.map(m => m.receiver.id);

        return sentMessages
            .filter((m, index) => receiversIds.indexOf(m.receiver.id) === index)
            .map(m => ({
                lastMessage: m,
                receiver: m.receiver,
                isUnread: true,
            }));
    }

    private async markMessageAsReceived(message: FindMeChatMessage): Promise<void> {
        message.readDate = new Date();
        await this.chatMessagesRepository.save(message);
    }
}
