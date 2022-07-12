import {MigrationInterface, QueryRunner} from "typeorm";

export class ChatPhotosBind1657637736266 implements MigrationInterface {
    name = 'ChatPhotosBind1657637736266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find-me-bind-chat-photos\` (\`findMeChatMessageId\` int NOT NULL, \`findMeChatPhotoId\` int NOT NULL, INDEX \`IDX_dff8ffac407ef3c58f9b63f0f3\` (\`findMeChatMessageId\`), INDEX \`IDX_905afcb47c7711a8459c6d26a6\` (\`findMeChatPhotoId\`), PRIMARY KEY (\`findMeChatMessageId\`, \`findMeChatPhotoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-chat-photos\` ADD CONSTRAINT \`FK_dff8ffac407ef3c58f9b63f0f3c\` FOREIGN KEY (\`findMeChatMessageId\`) REFERENCES \`find_me_chat_message\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-chat-photos\` ADD CONSTRAINT \`FK_905afcb47c7711a8459c6d26a68\` FOREIGN KEY (\`findMeChatPhotoId\`) REFERENCES \`find_me_chat_photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find-me-bind-chat-photos\` DROP FOREIGN KEY \`FK_905afcb47c7711a8459c6d26a68\``);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-chat-photos\` DROP FOREIGN KEY \`FK_dff8ffac407ef3c58f9b63f0f3c\``);
        await queryRunner.query(`DROP INDEX \`IDX_905afcb47c7711a8459c6d26a6\` ON \`find-me-bind-chat-photos\``);
        await queryRunner.query(`DROP INDEX \`IDX_dff8ffac407ef3c58f9b63f0f3\` ON \`find-me-bind-chat-photos\``);
        await queryRunner.query(`DROP TABLE \`find-me-bind-chat-photos\``);
    }

}
