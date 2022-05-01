import {MigrationInterface, QueryRunner} from "typeorm";

export class AnnouncementsUserViewLogs1651400454633 implements MigrationInterface {
    name = 'AnnouncementsUserViewLogs1651400454633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_announcement_view_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`viewDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`viewedAnnouncementId\` int NULL, \`viewingUserId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_view_log\` ADD CONSTRAINT \`FK_9260eba33666b50f3187ec55ab9\` FOREIGN KEY (\`viewedAnnouncementId\`) REFERENCES \`find_me_announcement\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_view_log\` ADD CONSTRAINT \`FK_f06cedc0cdf1670657afb4b9b1c\` FOREIGN KEY (\`viewingUserId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_view_log\` DROP FOREIGN KEY \`FK_f06cedc0cdf1670657afb4b9b1c\``);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_view_log\` DROP FOREIGN KEY \`FK_9260eba33666b50f3187ec55ab9\``);
        await queryRunner.query(`DROP TABLE \`find_me_announcement_view_log\``);
    }

}
