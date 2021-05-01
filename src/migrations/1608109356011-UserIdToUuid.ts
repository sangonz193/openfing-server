import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

import { getUuid } from "../_utils/getUuid";

export class UserIdToUuid1608109356011 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableName = "openfing.user";
		const table = await queryRunner.getTable(tableName);

		if (!table) throw new Error(`table not found`);

		await queryRunner.renameColumn(table, "id", "_id");
		await queryRunner.addColumn(
			table,
			new TableColumn({
				name: "id",
				type: "uuid",
				isNullable: true,
			})
		);

		const idMap = new Map<number, string>();
		await Promise.all(
			(await queryRunner.query(`SELECT * FROM ${tableName}`)).map(async (row: { _id: number }) => {
				const newRow = {
					id: getUuid(),
					_id: row._id,
				};
				idMap.set(newRow._id, newRow.id);
				await queryRunner.query(`UPDATE ${tableName} SET id = '${newRow.id}' where _id = ${newRow._id}`, []);
			})
		);

		const tableNames = [
			"course",
			"course_class",
			"course_class_chapter_cue",
			"course_class_list",
			"course_class_video",
			"course_class_video_format",
			"course_class_video_quality",
			"course_edition",
			"faq",
			"user_role",
			"user_to_user_role",
		];

		await Promise.all(
			tableNames.map(async (tableName) => {
				return Promise.all(
					["created_by_id", "updated_by_id", "deleted_by_id", "user_id"].map(async (column) => {
						try {
							await queryRunner.renameColumn(tableName, column, "_" + column);
						} catch (e) {
							return;
						}

						await queryRunner.addColumn(
							tableName,
							new TableColumn({
								name: column,
								type: "uuid",
								isNullable: true,
							})
						);

						await Promise.all(
							Array.from(idMap).map(async ([numberId, stringId]) => {
								await queryRunner.query(
									`UPDATE ${tableName} SET ${column} = '${stringId}' where _${column} = ${numberId}`
								);
							})
						);

						await queryRunner.dropColumn(tableName, `_${column}`);
					})
				);
			})
		);

		await queryRunner.dropColumn(table, "_id");
		await queryRunner.createPrimaryKey(table, ["id"]);
	}

	public async down(): Promise<void> {
		throw new Error("This migration is not reversible.");
	}
}
