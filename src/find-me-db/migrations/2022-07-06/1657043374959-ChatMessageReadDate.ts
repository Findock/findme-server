import {MigrationInterface, QueryRunner} from "typeorm";

export class ChatMessageReadDate1657043374959 implements MigrationInterface {
    name = 'ChatMessageReadDate1657043374959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find_me_chat_message\` ADD \`readDate\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find_me_chat_message\` DROP COLUMN \`readDate\``);
    }

}
