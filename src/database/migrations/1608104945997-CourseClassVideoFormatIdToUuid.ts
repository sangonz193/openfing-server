import { getUuid } from "@sangonz193/utils/getUuid"
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CourseClassVideoFormatIdToUuid1608104945997 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableName = "openfing.course_class_video_format"
		const table = await queryRunner.getTable(tableName)

		if (!table) {
			throw new Error(`table not found`)
		}

		await queryRunner.renameColumn(table, "id", "_id")
		await queryRunner.addColumn(
			table,
			new TableColumn({
				name: "id",
				type: "uuid",
				isNullable: true,
			})
		)

		await Promise.all(
			(
				await queryRunner.query(`SELECT * FROM ${tableName}`)
			).map(async (row: { _id: number }) => {
				const newRow = {
					id: getUuid(),
					_id: row._id,
				}
				await queryRunner.query(`UPDATE ${tableName} SET id = '${newRow.id}' where _id = ${newRow._id}`, [])
			})
		)

		await queryRunner.dropColumn(table, "_id")
		await queryRunner.createPrimaryKey(table, ["id"])
	}

	public async down(): Promise<void> {
		throw new Error("This migration is not reversible.")
	}
}
