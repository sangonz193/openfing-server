import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseClassPublishedField1604969916418 implements MigrationInterface {
	name = "CourseClassPublishedField1604969916418";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "openfing"."course_class" ADD "published_at" TIMESTAMP WITH TIME ZONE`);
		await queryRunner.query(`UPDATE "openfing"."course_class" set "published_at" = "created_at"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "openfing"."course_class" DROP COLUMN "published_at"`);
	}
}
