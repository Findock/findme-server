import {MigrationInterface, QueryRunner} from "typeorm";

export class CoatColors1649195483779 implements MigrationInterface {
    name = 'CoatColors1649195483779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`find_me_coat_color\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hex\` varchar(255) NOT NULL, \`namePl\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`find_me_coat_color\``);
    }

}
