import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPicture1704998946200 implements MigrationInterface {
    name = 'UserPicture1704998946200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "picture" character varying(450)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
    }

}
