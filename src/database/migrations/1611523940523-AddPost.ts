import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPost1611523940523 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "openfing"."post" ("id" uuid NOT NULL, "title" character varying, "content" text, "content_html" text, "short_content" text, "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_1b278cee90cf45e74153f1a9627" PRIMARY KEY ("id"))`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "openfing"."post"`)
	}
}
