import { MigrationInterface, QueryRunner } from "typeorm";

export class Stock1705761701478 implements MigrationInterface {
    name = 'Stock1705761701478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "stock" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stock"`);
    }

}
