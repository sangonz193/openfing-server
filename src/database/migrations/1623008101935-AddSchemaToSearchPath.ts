import { MigrationInterface, QueryRunner } from "typeorm"

import { databaseConfig } from "../database.config"

export class AddSchemaToSearchPath1623008101935 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		if (!queryRunner.manager.connection.driver.database) {
			throw new Error("TEST")
		}

		queryRunner.query(
			`ALTER DATABASE "${queryRunner.manager.connection.driver.database}" SET "search_path" TO "$user", "public", "${databaseConfig.typeormConfig.schema}";`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		//
	}
}
