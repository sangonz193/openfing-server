import { getUuid } from "@sangonz193/utils/getUuid"
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class CourseIdToUuid1608099052268 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableName = "openfing.course"
		const table = await queryRunner.getTable(tableName)
		const courseEditionTableName = "openfing.course_edition"
		const courseEditionTable = await queryRunner.getTable(courseEditionTableName)

		if (!table || !courseEditionTable) {
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

		const rows: Array<{ id: string; _id: number }> = await Promise.all(
			(await queryRunner.query(`SELECT * FROM ${tableName}`)).map(async (row: { _id: number }) => {
				const newRow = {
					id: getUuid(),
					_id: row._id,
				}
				await queryRunner.query(`UPDATE ${tableName} SET id = '${newRow.id}' where _id = ${newRow._id}`, [])

				return newRow
			})
		)

		await queryRunner.renameColumn(courseEditionTableName, "course_id", "_course_id")
		await queryRunner.addColumn(
			courseEditionTable,
			new TableColumn({
				name: "course_id",
				type: "uuid",
				isNullable: true,
			})
		)

		await Promise.all(
			rows.map(async (row) => {
				await queryRunner.query(
					`UPDATE ${courseEditionTableName} SET course_id = '${row.id}' where _course_id = ${row._id}`,
					[]
				)
			})
		)

		await queryRunner.dropColumn(courseEditionTable, "_course_id")
		await queryRunner.dropColumn(table, "_id")
		await queryRunner.createPrimaryKey(table, ["id"])
	}

	public async down(): Promise<void> {
		throw new Error("This migration is not reversible.")
	}
}
