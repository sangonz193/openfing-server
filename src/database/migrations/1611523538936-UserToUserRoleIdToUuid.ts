import { getUuid } from "@sangonz193/utils/getUuid"
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UserToUserRoleIdToUuid1611523538936 implements MigrationInterface {
	name = "UserToUserRoleIdToUuid1611523538936"

	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableName = "openfing.user_to_user_role"

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
			(await queryRunner.query(`SELECT * FROM ${tableName}`)).map(async (row: { _id: number }) => {
				const newRow = {
					id: getUuid(),
					_id: row._id,
				}
				await queryRunner.query(`UPDATE ${tableName} SET id = '${newRow.id}' where _id = ${newRow._id}`, [])

				return newRow
			})
		)

		await queryRunner.dropColumn(table, "_id")
		await queryRunner.createPrimaryKey(table, ["id"])
	}

	public async down(): Promise<void> {
		throw new Error("This migration is not reversible.")
	}
}
