import { MigrationInterface, QueryRunner } from "typeorm";

export class AddContentColumn1722434348725 implements MigrationInterface {
    name = 'AddContentColumn1722434348725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "content" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "content"`);
    }

}
