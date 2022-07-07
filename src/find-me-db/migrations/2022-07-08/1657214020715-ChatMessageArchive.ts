import {MigrationInterface, QueryRunner} from "typeorm";

export class ChatMessageArchive1657214020715 implements MigrationInterface {
    name = 'ChatMessageArchive1657214020715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_chat_archive\` (\`id\` int NOT NULL AUTO_INCREMENT, \`archiveDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`archiverId\` int NULL, \`archivedReceiverId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find_me_chat_archive\` ADD CONSTRAINT \`FK_427c34e43cb29aceb362230b117\` FOREIGN KEY (\`archiverId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find_me_chat_archive\` ADD CONSTRAINT \`FK_acd5691c000dd9c05377bd471b5\` FOREIGN KEY (\`archivedReceiverId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find_me_chat_archive\` DROP FOREIGN KEY \`FK_acd5691c000dd9c05377bd471b5\``);
        await queryRunner.query(`ALTER TABLE \`find_me_chat_archive\` DROP FOREIGN KEY \`FK_427c34e43cb29aceb362230b117\``);
        await queryRunner.query(`DROP TABLE \`find_me_chat_archive\``);
    }

}
