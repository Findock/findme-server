import {MigrationInterface, QueryRunner} from "typeorm";

export class AnnouncementPhotosAndModel1649401783461 implements MigrationInterface {
    name = 'AnnouncementPhotosAndModel1649401783461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_announcement_photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`find_me_announcement\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`gender\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`locationName\` varchar(255) NOT NULL, \`locationDescription\` varchar(255) NOT NULL, \`locationLat\` decimal(8,6) NOT NULL, \`locationLon\` decimal(9,6) NOT NULL, \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`creatorId\` int NULL, \`categoryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`find-me-bind-announcement-distinctive-features\` (\`findMeAnnouncementId\` int NOT NULL, \`findMeDistinctiveFeatureId\` int NOT NULL, INDEX \`IDX_a695b4e3d0e00235968e795dfd\` (\`findMeAnnouncementId\`), INDEX \`IDX_4d137e1b818173ce398ee22a0e\` (\`findMeDistinctiveFeatureId\`), PRIMARY KEY (\`findMeAnnouncementId\`, \`findMeDistinctiveFeatureId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`find-me-bind-announcement-coat-colors\` (\`findMeAnnouncementId\` int NOT NULL, \`findMeCoatColorId\` int NOT NULL, INDEX \`IDX_44755f6783fef2be8a24c92781\` (\`findMeAnnouncementId\`), INDEX \`IDX_3eee1990ec9da62a1e6fed9b2b\` (\`findMeCoatColorId\`), PRIMARY KEY (\`findMeAnnouncementId\`, \`findMeCoatColorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`find-me-bind-announcement-photos\` (\`findMeAnnouncementId\` int NOT NULL, \`findMeAnnouncementPhotoId\` int NOT NULL, INDEX \`IDX_193a4f34b8e34011d95a320113\` (\`findMeAnnouncementId\`), INDEX \`IDX_3896ae5bfa4693230189097d1d\` (\`findMeAnnouncementPhotoId\`), PRIMARY KEY (\`findMeAnnouncementId\`, \`findMeAnnouncementPhotoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_photo\` ADD CONSTRAINT \`FK_eec216c41ad20a989782801e138\` FOREIGN KEY (\`userId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement\` ADD CONSTRAINT \`FK_c4d53cfa9338529bfba4412eed7\` FOREIGN KEY (\`creatorId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement\` ADD CONSTRAINT \`FK_4c096a29724ae93565b8977912a\` FOREIGN KEY (\`categoryId\`) REFERENCES \`find_me_announcement_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-distinctive-features\` ADD CONSTRAINT \`FK_a695b4e3d0e00235968e795dfd6\` FOREIGN KEY (\`findMeAnnouncementId\`) REFERENCES \`find_me_announcement\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-distinctive-features\` ADD CONSTRAINT \`FK_4d137e1b818173ce398ee22a0e8\` FOREIGN KEY (\`findMeDistinctiveFeatureId\`) REFERENCES \`find_me_distinctive_feature\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-coat-colors\` ADD CONSTRAINT \`FK_44755f6783fef2be8a24c927819\` FOREIGN KEY (\`findMeAnnouncementId\`) REFERENCES \`find_me_announcement\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-coat-colors\` ADD CONSTRAINT \`FK_3eee1990ec9da62a1e6fed9b2bc\` FOREIGN KEY (\`findMeCoatColorId\`) REFERENCES \`find_me_coat_color\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-photos\` ADD CONSTRAINT \`FK_193a4f34b8e34011d95a3201135\` FOREIGN KEY (\`findMeAnnouncementId\`) REFERENCES \`find_me_announcement\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-photos\` ADD CONSTRAINT \`FK_3896ae5bfa4693230189097d1d9\` FOREIGN KEY (\`findMeAnnouncementPhotoId\`) REFERENCES \`find_me_announcement_photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-photos\` DROP FOREIGN KEY \`FK_3896ae5bfa4693230189097d1d9\``);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-photos\` DROP FOREIGN KEY \`FK_193a4f34b8e34011d95a3201135\``);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-coat-colors\` DROP FOREIGN KEY \`FK_3eee1990ec9da62a1e6fed9b2bc\``);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-coat-colors\` DROP FOREIGN KEY \`FK_44755f6783fef2be8a24c927819\``);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-distinctive-features\` DROP FOREIGN KEY \`FK_4d137e1b818173ce398ee22a0e8\``);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-announcement-distinctive-features\` DROP FOREIGN KEY \`FK_a695b4e3d0e00235968e795dfd6\``);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement\` DROP FOREIGN KEY \`FK_4c096a29724ae93565b8977912a\``);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement\` DROP FOREIGN KEY \`FK_c4d53cfa9338529bfba4412eed7\``);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_photo\` DROP FOREIGN KEY \`FK_eec216c41ad20a989782801e138\``);
        await queryRunner.query(`DROP INDEX \`IDX_3896ae5bfa4693230189097d1d\` ON \`find-me-bind-announcement-photos\``);
        await queryRunner.query(`DROP INDEX \`IDX_193a4f34b8e34011d95a320113\` ON \`find-me-bind-announcement-photos\``);
        await queryRunner.query(`DROP TABLE \`find-me-bind-announcement-photos\``);
        await queryRunner.query(`DROP INDEX \`IDX_3eee1990ec9da62a1e6fed9b2b\` ON \`find-me-bind-announcement-coat-colors\``);
        await queryRunner.query(`DROP INDEX \`IDX_44755f6783fef2be8a24c92781\` ON \`find-me-bind-announcement-coat-colors\``);
        await queryRunner.query(`DROP TABLE \`find-me-bind-announcement-coat-colors\``);
        await queryRunner.query(`DROP INDEX \`IDX_4d137e1b818173ce398ee22a0e\` ON \`find-me-bind-announcement-distinctive-features\``);
        await queryRunner.query(`DROP INDEX \`IDX_a695b4e3d0e00235968e795dfd\` ON \`find-me-bind-announcement-distinctive-features\``);
        await queryRunner.query(`DROP TABLE \`find-me-bind-announcement-distinctive-features\``);
        await queryRunner.query(`DROP TABLE \`find_me_announcement\``);
        await queryRunner.query(`DROP TABLE \`find_me_announcement_photo\``);
    }

}
