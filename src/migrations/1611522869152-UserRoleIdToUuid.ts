import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

import { getUuid } from "../_utils/getUuid";

export class UserRoleIdToUuid1611522869152 implements MigrationInterface {
	name = "UserRoleIdToUuid1611522869152";

	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableName = "openfing.user_role";
		const userToUserRoleTableName = "openfing.user_to_user_role";
		const userToUserRoleTableForeignKey = "user_role_id";

		const table = await queryRunner.getTable(tableName);
		const userToUserRoleTable = await queryRunner.getTable(userToUserRoleTableName);

		if (!table || !userToUserRoleTable) throw new Error(`table not found`);

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

		await queryRunner.renameColumn(
			userToUserRoleTable,
			userToUserRoleTableForeignKey,
			`_${userToUserRoleTableForeignKey}`
		);
		await queryRunner.addColumn(
			userToUserRoleTable,
			new TableColumn({
				name: userToUserRoleTableForeignKey,
				type: "uuid",
				isNullable: true,
			})
		);

		await Promise.all(
			rows.map(async (row) => {
				await queryRunner.query(
					`UPDATE ${userToUserRoleTableName} SET ${userToUserRoleTableForeignKey} = '${row.id}' where _${userToUserRoleTableForeignKey} = ${row._id}`,
					[]
				);
			})
		);

		await queryRunner.dropColumn(userToUserRoleTable, `_${userToUserRoleTableForeignKey}`);
		await queryRunner.dropColumn(table, "_id");
		await queryRunner.createPrimaryKey(table, ["id"]);
	}

	public async down(): Promise<void> {
		throw new Error("This migration is not reversible.");
	}
}
