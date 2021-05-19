import { MigrationInterface, QueryRunner } from "typeorm";

export class AddValidateEmail1621462809448 implements MigrationInterface {
	name = "AddValidateEmail1621462809448";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "openfing"."email_validation" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "issued_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_dcdcbd867b16b25557bce006698" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "openfing"."email_validation"`);
	}
}
