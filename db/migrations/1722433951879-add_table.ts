import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTable1722433951879 implements MigrationInterface {
    name = 'AddTable1722433951879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
    }

}
