import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseInit1648662081699 implements MigrationInterface {
    name = "DatabaseInit1648662081699";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `find_me_user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `name` varchar(255) NOT NULL DEFAULT '', `phoneNumber` varchar(255) NOT NULL DEFAULT '', `profileImageUrl` varchar(255) NOT NULL DEFAULT '', `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `street` varchar(255) NOT NULL DEFAULT '', `city` varchar(255) NOT NULL DEFAULT '', `bio` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `find_me_reset_password_token` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(255) NOT NULL, `generated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `find_me_auth_token` (`id` int NOT NULL AUTO_INCREMENT, `deviceName` varchar(255) NOT NULL, `localizationDescription` varchar(255) NOT NULL, `token` varchar(255) NOT NULL, `lastUse` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `active` tinyint NOT NULL DEFAULT 1, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `find_me_user_access_log` (`id` int NOT NULL AUTO_INCREMENT, `deleted` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `accessDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `accessedUserId` int NULL, `accessingUserId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `find_me_user_delete_log` (`id` int NOT NULL AUTO_INCREMENT, `deleted` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `find_me_reset_password_token` ADD CONSTRAINT `FK_ed1883ac79b8635cf2e888fed4b` FOREIGN KEY (`userId`) REFERENCES `find_me_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `find_me_auth_token` ADD CONSTRAINT `FK_5fc5c76ce969409214f89a2b79e` FOREIGN KEY (`userId`) REFERENCES `find_me_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `find_me_user_access_log` ADD CONSTRAINT `FK_ff2a7216fa16b57c42b97bcb917` FOREIGN KEY (`accessedUserId`) REFERENCES `find_me_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `find_me_user_access_log` ADD CONSTRAINT `FK_69b39197d9d8bf4bcbbc22ab0fe` FOREIGN KEY (`accessingUserId`) REFERENCES `find_me_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `find_me_user_delete_log` ADD CONSTRAINT `FK_aba9239ba03ac2a5c5f8d3fbbcc` FOREIGN KEY (`userId`) REFERENCES `find_me_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `find_me_user_delete_log` DROP FOREIGN KEY `FK_aba9239ba03ac2a5c5f8d3fbbcc`");
        await queryRunner.query("ALTER TABLE `find_me_user_access_log` DROP FOREIGN KEY `FK_69b39197d9d8bf4bcbbc22ab0fe`");
        await queryRunner.query("ALTER TABLE `find_me_user_access_log` DROP FOREIGN KEY `FK_ff2a7216fa16b57c42b97bcb917`");
        await queryRunner.query("ALTER TABLE `find_me_auth_token` DROP FOREIGN KEY `FK_5fc5c76ce969409214f89a2b79e`");
        await queryRunner.query("ALTER TABLE `find_me_reset_password_token` DROP FOREIGN KEY `FK_ed1883ac79b8635cf2e888fed4b`");
        await queryRunner.query("DROP TABLE `find_me_user_delete_log`");
        await queryRunner.query("DROP TABLE `find_me_user_access_log`");
        await queryRunner.query("DROP TABLE `find_me_auth_token`");
        await queryRunner.query("DROP TABLE `find_me_reset_password_token`");
        await queryRunner.query("DROP TABLE `find_me_user`");
    }

}
