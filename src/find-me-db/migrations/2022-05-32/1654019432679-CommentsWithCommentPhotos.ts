import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentsWithCommentPhotos1654019432679 implements MigrationInterface {
    name = 'CommentsWithCommentPhotos1654019432679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_comment_photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`find_me_comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(255) NOT NULL, \`locationLat\` decimal(8,6) NOT NULL, \`locationLon\` decimal(9,6) NOT NULL, \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`archived\` tinyint NOT NULL DEFAULT 0, \`commentedAnnouncementId\` int NULL, \`creatorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`find-me-bind-comment-photos\` (\`findMeCommentId\` int NOT NULL, \`findMeCommentPhotoId\` int NOT NULL, INDEX \`IDX_1b56c8c1a7dd8d37a4158db51a\` (\`findMeCommentId\`), INDEX \`IDX_53802b0626b2cdb2d1a57f2096\` (\`findMeCommentPhotoId\`), PRIMARY KEY (\`findMeCommentId\`, \`findMeCommentPhotoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`find_me_comment_photo\` ADD CONSTRAINT \`FK_3848f4d2a2639551c1258fd0f36\` FOREIGN KEY (\`userId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find_me_comment\` ADD CONSTRAINT \`FK_7d4a8197339071c9479a74dac55\` FOREIGN KEY (\`commentedAnnouncementId\`) REFERENCES \`find_me_announcement\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find_me_comment\` ADD CONSTRAINT \`FK_2e6e9743caa23f797c739f9fdc5\` FOREIGN KEY (\`creatorId\`) REFERENCES \`find_me_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-comment-photos\` ADD CONSTRAINT \`FK_1b56c8c1a7dd8d37a4158db51ab\` FOREIGN KEY (\`findMeCommentId\`) REFERENCES \`find_me_comment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-comment-photos\` ADD CONSTRAINT \`FK_53802b0626b2cdb2d1a57f20966\` FOREIGN KEY (\`findMeCommentPhotoId\`) REFERENCES \`find_me_comment_photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`find-me-bind-comment-photos\` DROP FOREIGN KEY \`FK_53802b0626b2cdb2d1a57f20966\``);
        await queryRunner.query(`ALTER TABLE \`find-me-bind-comment-photos\` DROP FOREIGN KEY \`FK_1b56c8c1a7dd8d37a4158db51ab\``);
        await queryRunner.query(`ALTER TABLE \`find_me_comment\` DROP FOREIGN KEY \`FK_2e6e9743caa23f797c739f9fdc5\``);
        await queryRunner.query(`ALTER TABLE \`find_me_comment\` DROP FOREIGN KEY \`FK_7d4a8197339071c9479a74dac55\``);
        await queryRunner.query(`ALTER TABLE \`find_me_comment_photo\` DROP FOREIGN KEY \`FK_3848f4d2a2639551c1258fd0f36\``);
        await queryRunner.query(`DROP INDEX \`IDX_53802b0626b2cdb2d1a57f2096\` ON \`find-me-bind-comment-photos\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b56c8c1a7dd8d37a4158db51a\` ON \`find-me-bind-comment-photos\``);
        await queryRunner.query(`DROP TABLE \`find-me-bind-comment-photos\``);
        await queryRunner.query(`DROP TABLE \`find_me_comment\``);
        await queryRunner.query(`DROP TABLE \`find_me_comment_photo\``);
    }

}
