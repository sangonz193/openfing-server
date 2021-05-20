import DataLoader from "dataloader";
import identity from "lodash/identity";
import { Connection } from "typeorm";

import { emailValidationColumns, emailValidationEntitySchema } from "./EmailValidation.entity";
import { EmailValidationRow } from "./EmailValidation.entity.types";

export type FindEmailValidationBatchOptions = {
	connection: Connection;
	emailValidationIds: readonly string[];
};

export async function findEmailValidationBatch(
	options: FindEmailValidationBatchOptions
): Promise<Array<EmailValidationRow | null>> {
	const { connection, emailValidationIds } = options;
	const rows = await connection
		.createQueryBuilder<EmailValidationRow>(emailValidationEntitySchema, "emailValidation")
		.where(
			`emailValidation.${emailValidationColumns.id.name} in (:...ids)`,
			identity<{ ids: Array<EmailValidationRow["id"]> }>({ ids: [...emailValidationIds] })
		)
		.getMany();

	return emailValidationIds.map((id) => {
		return rows.find((row) => row.id === id) ?? null;
	});
}

export function getFindEmailValidationDataLoader(connection: Connection) {
	return new DataLoader<string, EmailValidationRow | null>(
		(emailValidationIds) =>
			findEmailValidationBatch({
				connection,
				emailValidationIds,
			}),
		{
			cache: false,
		}
	);
}
