import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1705322045629 implements MigrationInterface {
    name = 'UpdateProduct1705322045629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "optionNames" jsonb`);
        await queryRunner.query(`ALTER TABLE "product" ADD "variations" jsonb`);
        await queryRunner.query(`ALTER TABLE "product" ADD "sku" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "weight" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sku"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "variations"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "optionNames"`);
    }

}
