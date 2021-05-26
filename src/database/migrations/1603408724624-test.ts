import { MigrationInterface, QueryRunner } from "typeorm"

export class test1603408724624 implements MigrationInterface {
	name = "test1603408724624"

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "openfing"."course" ("id" SERIAL NOT NULL, "name" character varying, "visibility" character varying, "code" character varying NOT NULL, "icon_url" character varying, "eva" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_e653aadbec06b3aee702dd75379" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class" ("id" SERIAL NOT NULL, "name" character varying, "number" smallint, "visibility" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_list_id" integer, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_a57146a842976465facbf8ffaa5" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_chapter_cue" ("id" uuid NOT NULL, "name" character varying NOT NULL, "start_seconds" numeric NOT NULL, "end_seconds" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_id" integer NOT NULL, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_f202e0a891399089f6f33e83f3c" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_list" ("id" SERIAL NOT NULL, "name" character varying, "code" character varying, "visibility" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_edition_id" integer, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_3e19c53024841f8d71a5c8c09e5" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_video" ("id" SERIAL NOT NULL, "name" character varying, "position" smallint, "visibility" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_id" integer, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_59ebbf2579e253ce811d5ca9a39" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_video_format" ("id" SERIAL NOT NULL, "name" character varying, "url" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_video_quality_id" integer, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_560e4b37085e1c78a21db011ed1" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_video_quality" ("id" SERIAL NOT NULL, "width" integer, "height" integer, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_video_id" integer, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_59a0f1af792db86aad59993b467" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_edition" ("id" SERIAL NOT NULL, "name" character varying, "semester" integer NOT NULL, "year" integer, "visibility" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_id" integer, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_95cea5f51c337a24eac59a3ca34" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."faq" ("id" SERIAL NOT NULL, "title" character varying, "content" text, "is_html" boolean, "position" smallint, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" integer, "updated_by_id" integer, "deleted_by_id" integer, CONSTRAINT "PK_ca95e0c6ca3ac99b00ee61db57f" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "uid" character varying, "password" text NOT NULL, "name" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_2a5cb43306502d24c4e69e36a44" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."user_role" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_a6a012c3a4ea8a5e93e6a49308a" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."user_to_user_role" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "user_role_id" integer NOT NULL, CONSTRAINT "PK_7e3d226045eaa44056252d1f426" PRIMARY KEY ("id"))`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "openfing"."user_to_user_role"`)
		await queryRunner.query(`DROP TABLE "openfing"."user_role"`)
		await queryRunner.query(`DROP TABLE "openfing"."user"`)
		await queryRunner.query(`DROP TABLE "openfing"."faq"`)
		await queryRunner.query(`DROP TABLE "openfing"."course_edition"`)
		await queryRunner.query(`DROP TABLE "openfing"."course_class_video_quality"`)
		await queryRunner.query(`DROP TABLE "openfing"."course_class_video_format"`)
		await queryRunner.query(`DROP TABLE "openfing"."course_class_video"`)
		await queryRunner.query(`DROP TABLE "openfing"."course_class_list"`)
		await queryRunner.query(`DROP TABLE "openfing"."course_class_chapter_cue"`)
		await queryRunner.query(`DROP TABLE "openfing"."course_class"`)
		await queryRunner.query(`DROP TABLE "openfing"."course"`)
	}
}
