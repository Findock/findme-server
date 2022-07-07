import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateFindMeChatMessageDto } from "@/find-me-chat/dto/create-find-me-chat-message.dto";
import { GetFindMeChatListItemDto } from "@/find-me-chat/dto/get-find-me-chat-list-item.dto";
import { FindMeChatMessage } from "@/find-me-chat/entities/find-me-chat-message.entity";
import { FindMeChatArchiveService } from "@/find-me-chat/services/find-me-chat-archive.service";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeChatService {
    public constructor(
        @InjectRepository(FindMeChatMessage)
        private chatMessagesRepository: Repository<FindMeChatMessage>,
        private chatArchivesService: FindMeChatArchiveService
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
        const archivedMessages = await this.chatArchivesService.getArchivedChatsForUser(user);
        const archivedReceiverIds = archivedMessages.map(m => m.archivedReceiver.id);

        let sentMessages = await this.getUserSentMessages(user);
        let receivedMessages = await this.getUserReceivedMessages(user);

        sentMessages = sentMessages
            .filter(m => !archivedReceiverIds.includes(m.receiver.id))
            .sort((a, b) => {
                return b.sentDate.getTime() - a.sentDate.getTime();
            });
        receivedMessages = receivedMessages
            .filter(m => !archivedReceiverIds.includes(m.sender.id))
            .sort((a, b) => {
                return b.sentDate.getTime() - a.sentDate.getTime();
            });

        return this.parseMessagesToChatListItems([ ...sentMessages, ...receivedMessages ]);
    }

    public async getUserArchivedMessagesList(user: FindMeUser): Promise<GetFindMeChatListItemDto[]> {
        const archivedMessages = await this.chatArchivesService.getArchivedChatsForUser(user);
        const archivedReceiverIds = archivedMessages.map(m => m.archivedReceiver.id);

        let sentMessages = await this.getUserSentMessages(user);
        let receivedMessages = await this.getUserReceivedMessages(user);

        sentMessages = sentMessages
            .filter(m => archivedReceiverIds.includes(m.receiver.id))
            .sort((a, b) => {
                return b.sentDate.getTime() - a.sentDate.getTime();
            });
        receivedMessages = receivedMessages
            .filter(m => archivedReceiverIds.includes(m.sender.id))
            .sort((a, b) => {
                return b.sentDate.getTime() - a.sentDate.getTime();
            });

        return this.parseMessagesToChatListItems([ ...sentMessages, ...receivedMessages ]);
    }

    private async getUserSentMessages(user: FindMeUser): Promise<FindMeChatMessage[]> {
        return this.chatMessagesRepository.find({
            where: { sender: user.id },
            relations: [
                "sender",
                "receiver",
            ],
        });
    }

    private async getUserReceivedMessages(user: FindMeUser): Promise<FindMeChatMessage[]> {
        return this.chatMessagesRepository.find({
            where: { receiver: user.id },
            relations: [
                "sender",
                "receiver",
            ],
        });
    }

    private parseMessagesToChatListItems(messages: FindMeChatMessage[]): GetFindMeChatListItemDto[] {
        const receiversIds = messages.map(m => m.receiver.id);
        return messages.filter((m, index) => receiversIds.indexOf(m.receiver.id) === index)
            .map(m => ({
                lastMessage: m,
                receiver: m.receiver,
                unreadCount: 0,
            }));
    }

    private async markMessageAsReceived(message: FindMeChatMessage): Promise<void> {
        message.readDate = new Date();
        await this.chatMessagesRepository.save(message);
    }
}
