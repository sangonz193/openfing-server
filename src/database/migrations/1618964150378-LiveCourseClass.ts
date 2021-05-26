import { MigrationInterface, QueryRunner } from "typeorm"

export class LiveCourseClass1618964150378 implements MigrationInterface {
	name = "LiveCourseClass1618964150378"

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_live_state" ("id" uuid NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE, "in_progress" boolean, "html" text, "course_class_id" uuid NOT NULL, CONSTRAINT "PK_0a927060c53a2681f8f09c7dfca" PRIMARY KEY ("id"))`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "openfing"."course_class_live_state"`)
	}
}
