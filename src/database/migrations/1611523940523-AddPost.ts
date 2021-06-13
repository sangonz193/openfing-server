import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPost1611523940523 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "openfing"."post" ("id" uuid NOT NULL, "title" character varying, "content" text, "content_html" text, "short_content" text, "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_1b278cee90cf45e74153f1a9627" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "openfing"."post" ADD CONSTRAINT "FK_dc75854895c02a843a810164aac" FOREIGN KEY ("created_by_id") REFERENCES "openfing"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "openfing"."post" ADD CONSTRAINT "FK_302a18cbc75a91d9f102119d04a" FOREIGN KEY ("updated_by_id") REFERENCES "openfing"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "openfing"."post" ADD CONSTRAINT "FK_b7c677d65d6e6dfbbc9cc45ae42" FOREIGN KEY ("deleted_by_id") REFERENCES "openfing"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "openfing"."post" DROP CONSTRAINT "FK_b7c677d65d6e6dfbbc9cc45ae42"`);
		await queryRunner.query(`ALTER TABLE "openfing"."post" DROP CONSTRAINT "FK_302a18cbc75a91d9f102119d04a"`);
		await queryRunner.query(`ALTER TABLE "openfing"."post" DROP CONSTRAINT "FK_dc75854895c02a843a810164aac"`);
		await queryRunner.query(`DROP TABLE "openfing"."post"`);
	}
}
