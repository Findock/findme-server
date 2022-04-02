import {MigrationInterface, QueryRunner} from "typeorm";

export class DistinctiveFeatures1648901062286 implements MigrationInterface {
    name = 'DistinctiveFeatures1648901062286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_distinctive_feature\` (\`id\` int NOT NULL AUTO_INCREMENT, \`namePl\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`find_me_distinctive_feature\``);
    }

}
