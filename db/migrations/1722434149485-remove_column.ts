import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumn1722434149485 implements MigrationInterface {
    name = 'RemoveColumn1722434149485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" character varying(255) NOT NULL`);
    }

}
