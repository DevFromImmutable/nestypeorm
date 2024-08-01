import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveLastnameColumnFromUser1722489251704 implements MigrationInterface {
    name = 'RemoveLastnameColumnFromUser1722489251704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying(255) NOT NULL`);
    }

}
