import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct21705349079209 implements MigrationInterface {
    name = 'UpdateProduct21705349079209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" money`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "weight" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "weight" integer`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer`);
    }

}
