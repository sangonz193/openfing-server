import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

import { getUuid } from "@sangonz193/utils/getUuid";

export class CourseClassIdToUuid1608101330903 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableName = "openfing.course_class";
		const table = await queryRunner.getTable(tableName);
		const courseClassChapterCueTableName = "openfing.course_class_chapter_cue";
		const courseClassChapterCueTable = await queryRunner.getTable(courseClassChapterCueTableName);
		const courseClassVideoTableName = "openfing.course_class_video";
		const courseClassVideoTable = await queryRunner.getTable(courseClassVideoTableName);

		if (!table || !courseClassChapterCueTable || !courseClassVideoTable) {
			throw new Error(`table not found`);
		}

		await queryRunner.renameColumn(table, "id", "_id");
		await queryRunner.addColumn(
			table,
			new TableColumn({
				name: "id",
				type: "uuid",
				isNullable: true,
			})
		);

		const rows: Array<{ id: string; _id: number }> = await Promise.all(
			(await queryRunner.query(`SELECT * FROM ${tableName}`)).map(async (row: { _id: number }) => {
				const newRow = {
					id: getUuid(),
					_id: row._id,
				};
				await queryRunner.query(`UPDATE ${tableName} SET id = '${newRow.id}' where _id = ${newRow._id}`, []);

				return newRow;
			})
		);

		const updateFk = async (tableName: string) => {
			await queryRunner.renameColumn(tableName, "course_class_id", "_course_class_id");
			await queryRunner.addColumn(
				tableName,
				new TableColumn({
					name: "course_class_id",
					type: "uuid",
					isNullable: true,
				})
			);

			await Promise.all(
				rows.map(async (row) => {
					await queryRunner.query(
						`UPDATE ${tableName} SET course_class_id = '${row.id}' where _course_class_id = ${row._id}`,
						[]
					);
				})
			);

			await queryRunner.dropColumn(tableName, "_course_class_id");
		};

		await Promise.all([updateFk(courseClassChapterCueTableName), updateFk(courseClassVideoTableName)]);

		await queryRunner.dropColumn(table, "_id");
		await queryRunner.createPrimaryKey(table, ["id"]);
	}

	public async down(): Promise<void> {
		throw new Error("This migration is not reversible.");
	}
}
