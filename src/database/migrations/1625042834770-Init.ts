import { MigrationInterface, QueryRunner } from "typeorm"

export class Init1625042834770 implements MigrationInterface {
	name = "Init1625042834770"

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "openfing"."course" ("id" uuid NOT NULL, "name" character varying, "visibility" character varying, "code" character varying NOT NULL, "icon_url" character varying, "eva" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_e653aadbec06b3aee702dd75379" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class" ("id" uuid NOT NULL, "name" character varying, "number" smallint, "visibility" character varying, "published_at" TIMESTAMP WITH TIME ZONE, "course_class_list_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_a57146a842976465facbf8ffaa5" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_chapter_cue" ("id" uuid NOT NULL, "name" character varying NOT NULL, "start_seconds" numeric NOT NULL, "end_seconds" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_id" uuid NOT NULL, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_f202e0a891399089f6f33e83f3c" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_list" ("id" uuid NOT NULL, "name" character varying, "code" character varying, "visibility" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_edition_id" uuid, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_3e19c53024841f8d71a5c8c09e5" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_live_state" ("id" uuid NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE, "in_progress" boolean, "html" text, "course_class_id" uuid NOT NULL, CONSTRAINT "PK_0a927060c53a2681f8f09c7dfca" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_video" ("id" uuid NOT NULL, "name" character varying, "position" smallint, "visibility" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_id" uuid, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_59ebbf2579e253ce811d5ca9a39" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_video_format" ("id" uuid NOT NULL, "name" character varying, "url" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_video_quality_id" uuid, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_560e4b37085e1c78a21db011ed1" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_class_video_quality" ("id" uuid NOT NULL, "width" integer, "height" integer, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_class_video_id" uuid, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_59a0f1af792db86aad59993b467" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."course_edition" ("id" uuid NOT NULL, "name" character varying, "semester" integer NOT NULL, "year" integer, "visibility" character varying, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "course_id" uuid, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_95cea5f51c337a24eac59a3ca34" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."email_validation" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "issued_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_dcdcbd867b16b25557bce006698" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`CREATE TABLE "openfing"."faq" ("id" uuid NOT NULL, "title" character varying, "content" text, "is_html" boolean, "position" smallint, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by_id" uuid, "updated_by_id" uuid, "deleted_by_id" uuid, CONSTRAINT "PK_ca95e0c6ca3ac99b00ee61db57f" PRIMARY KEY ("id"))`
		)
	}
}
