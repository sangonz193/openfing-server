import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

import { getUuid } from "../../_utils/getUuid";

export class FaqIdToUuid1608107547417 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const tableName = "openfing.faq";
		const table = await queryRunner.getTable(tableName);

		if (!table) {
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

		await Promise.all(
			(await queryRunner.query(`SELECT * FROM ${tableName}`)).map(async (row: { _id: number }) => {
				const newRow = {
					id: getUuid(),
					_id: row._id,
				};
				await queryRunner.query(`UPDATE ${tableName} SET id = '${newRow.id}' where _id = '${newRow._id}'`, []);
			})
		);

		await queryRunner.dropColumn(table, "_id");
		await queryRunner.createPrimaryKey(table, ["id"]);
	}

	public async down(): Promise<void> {
		throw new Error("This migration is not reversible.");
	}
}
