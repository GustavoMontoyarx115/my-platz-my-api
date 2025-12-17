import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeVarchar1764455928949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE varchar(900)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE varchar(800)`);
    }

}
