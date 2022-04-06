import {MigrationInterface, QueryRunner} from "typeorm";

export class AnnouncementModel1649266638324 implements MigrationInterface {
    name = 'AnnouncementModel1649266638324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_announcement\` (\`id\` int NOT NULL AUTO_INCREMENT, \`gender\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`locationName\` varchar(255) NOT NULL, \`locationDescription\` varchar(255) NOT NULL, \`locationLat\` decimal(8,6) NOT NULL, \`locationLon\` decimal(9,6) NOT NULL, \`categoryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fin_me_ann_dis_fea_fin_me_dis_fea\` (\`findMeAnnouncementId\` int NOT NULL, \`findMeDistinctiveFeatureId\` int NOT NULL, INDEX \`IDX_3e3538a47bc94e84101d438ecc\` (\`findMeAnnouncementId\`), INDEX \`IDX_cca7d93746413f4b8c23ca891e\` (\`findMeDistinctiveFeatureId\`), PRIMARY KEY (\`findMeAnnouncementId\`, \`findMeDistinctiveFeatureId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`find_me_announcement_coat_colors_find_me_coat_color\` (\`findMeAnnouncementId\` int NOT NULL, \`findMeCoatColorId\` int NOT NULL, INDEX \`IDX_d75e5a85af22851687d99bae8f\` (\`findMeAnnouncementId\`), INDEX \`IDX_f13a51c9ddc58765b9d1b0dcd5\` (\`findMeCoatColorId\`), PRIMARY KEY (\`findMeAnnouncementId\`, \`findMeCoatColorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement\` ADD CONSTRAINT \`FK_4c096a29724ae93565b8977912a\` FOREIGN KEY (\`categoryId\`) REFERENCES \`find_me_announcement_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`fin_me_ann_dis_fea_fin_me_dis_fea\` ADD CONSTRAINT \`FK_3e3538a47bc94e84101d438ecc9\` FOREIGN KEY (\`findMeAnnouncementId\`) REFERENCES \`find_me_announcement\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`fin_me_ann_dis_fea_fin_me_dis_fea\` ADD CONSTRAINT \`FK_cca7d93746413f4b8c23ca891ed\` FOREIGN KEY (\`findMeDistinctiveFeatureId\`) REFERENCES \`find_me_distinctive_feature\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_coat_colors_find_me_coat_color\` ADD CONSTRAINT \`FK_d75e5a85af22851687d99bae8fd\` FOREIGN KEY (\`findMeAnnouncementId\`) REFERENCES \`find_me_announcement\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_coat_colors_find_me_coat_color\` ADD CONSTRAINT \`FK_f13a51c9ddc58765b9d1b0dcd53\` FOREIGN KEY (\`findMeCoatColorId\`) REFERENCES \`find_me_coat_color\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_coat_colors_find_me_coat_color\` DROP FOREIGN KEY \`FK_f13a51c9ddc58765b9d1b0dcd53\``);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement_coat_colors_find_me_coat_color\` DROP FOREIGN KEY \`FK_d75e5a85af22851687d99bae8fd\``);
        await queryRunner.query(`ALTER TABLE \`fin_me_ann_dis_fea_fin_me_dis_fea\` DROP FOREIGN KEY \`FK_cca7d93746413f4b8c23ca891ed\``);
        await queryRunner.query(`ALTER TABLE \`fin_me_ann_dis_fea_fin_me_dis_fea\` DROP FOREIGN KEY \`FK_3e3538a47bc94e84101d438ecc9\``);
        await queryRunner.query(`ALTER TABLE \`find_me_announcement\` DROP FOREIGN KEY \`FK_4c096a29724ae93565b8977912a\``);
        await queryRunner.query(`DROP INDEX \`IDX_f13a51c9ddc58765b9d1b0dcd5\` ON \`find_me_announcement_coat_colors_find_me_coat_color\``);
        await queryRunner.query(`DROP INDEX \`IDX_d75e5a85af22851687d99bae8f\` ON \`find_me_announcement_coat_colors_find_me_coat_color\``);
        await queryRunner.query(`DROP TABLE \`find_me_announcement_coat_colors_find_me_coat_color\``);
        await queryRunner.query(`DROP INDEX \`IDX_cca7d93746413f4b8c23ca891e\` ON \`fin_me_ann_dis_fea_fin_me_dis_fea\``);
        await queryRunner.query(`DROP INDEX \`IDX_3e3538a47bc94e84101d438ecc\` ON \`fin_me_ann_dis_fea_fin_me_dis_fea\``);
        await queryRunner.query(`DROP TABLE \`fin_me_ann_dis_fea_fin_me_dis_fea\``);
        await queryRunner.query(`DROP TABLE \`find_me_announcement\``);
    }

}
