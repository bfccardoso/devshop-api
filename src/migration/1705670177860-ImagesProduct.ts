import { MigrationInterface, QueryRunner } from "typeorm";

export class ImagesProduct1705670177860 implements MigrationInterface {
    name = 'ImagesProduct1705670177860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "images" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "images"`);
    }

}
