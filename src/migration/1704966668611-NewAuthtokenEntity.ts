import { MigrationInterface, QueryRunner } from "typeorm";

export class NewAuthtokenEntity1704966668611 implements MigrationInterface {
    name = 'NewAuthtokenEntity1704966668611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_token" ADD "lastUsedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth_token" ADD "active" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auth_token" ADD "userAgent" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_token" DROP COLUMN "userAgent"`);
        await queryRunner.query(`ALTER TABLE "auth_token" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "auth_token" DROP COLUMN "lastUsedAt"`);
    }

}
