import {MigrationInterface, QueryRunner} from "typeorm";

export class ChatMessage1657041897859 implements MigrationInterface {
    name = 'ChatMessage1657041897859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_chat_message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` varchar(255) NOT NULL, \`locationLat\` decimal(8,6) NULL, \`locationLon\` decimal(9,6) NULL, \`sentDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`senderId\` int NULL, \`receiverId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find_me_chat_message\` ADD CONSTRAINT \`FK_8ad08c65927d216249cf7d44344\` FOREIGN KEY (\`senderId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find_me_chat_message\` ADD CONSTRAINT \`FK_a733cb74c009007035d0f5e2b67\` FOREIGN KEY (\`receiverId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find_me_chat_message\` DROP FOREIGN KEY \`FK_a733cb74c009007035d0f5e2b67\``);
        await queryRunner.query(`ALTER TABLE \`find_me_chat_message\` DROP FOREIGN KEY \`FK_8ad08c65927d216249cf7d44344\``);
        await queryRunner.query(`DROP TABLE \`find_me_chat_message\``);
    }

}
