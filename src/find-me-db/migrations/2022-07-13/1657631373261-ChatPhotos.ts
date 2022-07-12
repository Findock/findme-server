import {MigrationInterface, QueryRunner} from "typeorm";

export class ChatPhotos1657631373261 implements MigrationInterface {
    name = 'ChatPhotos1657631373261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_chat_photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find_me_chat_photo\` ADD CONSTRAINT \`FK_c1f7ff2036b407e5f250e36a260\` FOREIGN KEY (\`userId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find_me_chat_photo\` DROP FOREIGN KEY \`FK_c1f7ff2036b407e5f250e36a260\``);
        await queryRunner.query(`DROP TABLE \`find_me_chat_photo\``);
    }

}
