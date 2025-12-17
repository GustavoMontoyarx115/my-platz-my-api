import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764448324563 implements MigrationInterface {
    name = 'Init1764448324563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "avatar" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text, "cover_image" character varying(255), "summary" character varying(500), "is_draft" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "profile_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_categories" ("post_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_4d9e522c51f13c52ad35813cf35" PRIMARY KEY ("post_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_becbe37977577e3eeb089b69fe" ON "post_categories" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f6e2655c798334198182db6399" ON "post_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_categories" ADD CONSTRAINT "FK_becbe37977577e3eeb089b69fe1" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_categories" ADD CONSTRAINT "FK_f6e2655c798334198182db6399b" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_categories" DROP CONSTRAINT "FK_f6e2655c798334198182db6399b"`);
        await queryRunner.query(`ALTER TABLE "post_categories" DROP CONSTRAINT "FK_becbe37977577e3eeb089b69fe1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6e2655c798334198182db6399"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_becbe37977577e3eeb089b69fe"`);
        await queryRunner.query(`DROP TABLE "post_categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}
