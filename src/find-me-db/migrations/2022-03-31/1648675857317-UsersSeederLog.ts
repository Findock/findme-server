import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersSeederLog1648675857317 implements MigrationInterface {
    name = 'UsersSeederLog1648675857317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_seeder_log\` (\`int\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`seeded\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`int\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`find_me_seeder_log\``);
    }

}
