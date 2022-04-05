import {MigrationInterface, QueryRunner} from "typeorm";

export class AnnouncementCategories1649141390201 implements MigrationInterface {
    name = 'AnnouncementCategories1649141390201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_announcement_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`namePl\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`find_me_announcement_category\``);
    }

}
