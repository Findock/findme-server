import {MigrationInterface, QueryRunner} from "typeorm";

export class FavoriteAnnouncements1650490080188 implements MigrationInterface {
    name = 'FavoriteAnnouncements1650490080188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_favorite_announcement\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`announcementId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find_me_favorite_announcement\` ADD CONSTRAINT \`FK_bdca2871671686cff5f2ff53eab\` FOREIGN KEY (\`userId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find_me_favorite_announcement\` ADD CONSTRAINT \`FK_a0fd09e1aa4c43edf788aa5d5a1\` FOREIGN KEY (\`announcementId\`) REFERENCES \`find_me_announcement\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find_me_favorite_announcement\` DROP FOREIGN KEY \`FK_a0fd09e1aa4c43edf788aa5d5a1\``);
        await queryRunner.query(`ALTER TABLE \`find_me_favorite_announcement\` DROP FOREIGN KEY \`FK_bdca2871671686cff5f2ff53eab\``);
        await queryRunner.query(`DROP TABLE \`find_me_favorite_announcement\``);
    }

}
