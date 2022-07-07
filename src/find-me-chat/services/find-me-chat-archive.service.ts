import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FindMeChatArchive } from "@/find-me-chat/entities/find-me-chat-archive.entity";
import { ErrorMessagesConstants } from "@/find-me-commons/constants/error-messages.constants";
import { FindMeUser } from "@/find-me-users/entities/find-me-user.entity";

@Injectable()
export class FindMeChatArchiveService {
    public constructor(
        @InjectRepository(FindMeChatArchive)
        private chatArchivesRepository: Repository<FindMeChatArchive>
    ) { }

    public async archiveChatWithUser(
        archivingUser: FindMeUser,
        archivedUser: FindMeUser
    ): Promise<void> {
        const possibleChatArchive = await this.getChatArchiveByUsersCombination(
            archivingUser,
            archivedUser
        );
        if (possibleChatArchive) throw new BadRequestException([ ErrorMessagesConstants.CHAT_IS_ALREADY_ARCHIVED ]);
        const archive = this.chatArchivesRepository.create({
            archiver: archivingUser,
            archivedReceiver: archivedUser,
        });
        await this.chatArchivesRepository.save(archive);
    }

    public async removeArchiveChatWithUser(
        archivingUser: FindMeUser,
        archivedUser: FindMeUser
    ): Promise<void> {
        const possibleChatArchive = await this.getChatArchiveByUsersCombination(
            archivingUser,
            archivedUser
        );
        if (!possibleChatArchive) throw new BadRequestException([ ErrorMessagesConstants.CHAT_IS_NOT_ARCHIVED ]);
        await this.chatArchivesRepository.remove(possibleChatArchive);
    }

    public async getArchivedChatsForUser(user: FindMeUser): Promise<FindMeChatArchive[]> {
        return this.chatArchivesRepository.find({
            where: { archiver: user.id },
            relations: [
                "archiver",
                "archivedReceiver",
            ],
        });
    }

    private async getChatArchiveByUsersCombination(
        archivingUser: FindMeUser,
        archivedUser: FindMeUser
    ): Promise<FindMeChatArchive | null> {
        return this.chatArchivesRepository.findOne({
            where: {
                archiver: archivingUser.id,
                archivedReceiver: archivedUser.id,
            },
            relations: [
                "archiver",
                "archivedReceiver",
            ],
        });
    }
}
