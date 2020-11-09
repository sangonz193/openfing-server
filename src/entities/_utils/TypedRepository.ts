import { Repository } from "typeorm";

import { EntityRow, Relations, TypedEntitySchema } from "./createTypedEntitySchema";

export type TypedRepository<T extends TypedEntitySchema> = Repository<
	EntityRow<T> &
		{
			[K in keyof Exclude<T["_TRelations"], undefined>]: Exclude<T["_TRelations"], undefined> extends Relations
				? Exclude<T["_TRelations"], undefined>[K]["type"] extends "one-to-many" | "many-to-many"
					? Array<EntityRow<Exclude<Exclude<T["_TRelations"], undefined>[K]["_TTarget"], undefined>>>
					: EntityRow<Exclude<Exclude<T["_TRelations"], undefined>[K]["_TTarget"], undefined>>
				: never;
		}
>;
