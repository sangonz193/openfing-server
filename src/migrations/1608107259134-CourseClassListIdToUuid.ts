import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

import { getUuid } from "../_utils/getUuid";

export class CourseClassListIdToUuid1608107259134 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableName = "openfing.course_edition";
		const table = await queryRunner.getTable(tableName);
		const courseClassListTableName = "openfing.course_class_list";
		const courseClassListTable = await queryRunner.getTable(courseClassListTableName);

		if (!table || !courseClassListTable) throw new Error(`table not found`);

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

		await queryRunner.renameColumn(courseClassListTableName, "course_edition_id", "_course_edition_id");
		await queryRunner.addColumn(
			courseClassListTable,
			new TableColumn({
				name: "course_edition_id",
				type: "uuid",
				isNullable: true,
			})
		);

		await Promise.all(
			rows.map(async (row) => {
				await queryRunner.query(
					`UPDATE ${courseClassListTableName} SET course_edition_id = '${row.id}' where _course_edition_id = ${row._id}`,
					[]
				);
			})
		);

		await queryRunner.dropColumn(courseClassListTable, "_course_edition_id");
		await queryRunner.dropColumn(table, "_id");
		await queryRunner.createPrimaryKey(table, ["id"]);
	}

	public async down(): Promise<void> {
		throw new Error("This migration is not reversible.");
	}
}
