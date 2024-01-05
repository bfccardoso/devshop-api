import { MigrationInterface, QueryRunner } from "typeorm";

export class BrandLogo1704460438158 implements MigrationInterface {
    name = 'BrandLogo1704460438158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" ADD "logo" character varying(450)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "logo"`);
    }

}
