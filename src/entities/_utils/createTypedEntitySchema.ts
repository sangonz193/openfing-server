/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnType, EntitySchema } from "typeorm";
import { RelationType } from "typeorm/metadata/types/RelationTypes";

import { SafeExtract } from "../../_utils/utilTypes";

export type ColumnTypeMap = {
	[K in SafeExtract<ColumnType, "varchar" | "text" | "uuid">]: string;
} &
	{
		[K in SafeExtract<ColumnType, "integer" | "smallint" | "bigint" | "decimal">]: number;
	} &
	{
		[K in SafeExtract<ColumnType, "timestamp with time zone">]: Date;
	} &
	{
		[K in SafeExtract<ColumnType, "boolean">]: boolean;
	};

export type PrimaryColumnColumnTypeMap = Pick<ColumnTypeMap, "integer" | "smallint" | "uuid">;
export type DefaultPrimaryColumnTypeArg = {
	name: string;
	type: keyof PrimaryColumnColumnTypeMap;
	entity: TypedEntitySchema;
};
export type PrimaryColumn<T extends DefaultPrimaryColumnTypeArg = DefaultPrimaryColumnTypeArg> = {
	_entity?: T["entity"];
	name: T["name"];
	type: T["type"];
	primary: true;
} & (ColumnTypeMap[T["type"]] extends number
	? {
			generated: "increment";
	  }
	: {
			//
	  });

export type DefaultColumnTypeArg = {
	name: string;
	type: keyof ColumnTypeMap;
	nullable?: boolean;
};
export type Column<T extends DefaultColumnTypeArg = DefaultColumnTypeArg> = {
	name: T["name"];
	_value?: T["nullable"] extends false ? ColumnTypeMap[T["type"]] : ColumnTypeMap[T["type"]] | null;
	type: T["type"];
	nullable: T["nullable"] extends boolean ? T["nullable"] : true;
};

export type Columns = Record<string, PrimaryColumn<any> | Column<any>>;

export type DefaultRelationTypeArg = {
	name: string;
	entity: TypedEntitySchema<{ name: string; columns: {}; relations: {} }>;
	type: RelationType;
	fromJoinName: string;
	toJoinName: string;
	inverseSide: string;
	isOwner: boolean;
};
export type Relation<T extends DefaultRelationTypeArg = DefaultRelationTypeArg> = {
	name: T["name"];
	_TTarget?: T["entity"];
	target: Exclude<T["entity"]["_TName"], undefined>;
	type: T["type"];
	inverseSide: T["inverseSide"];
} & (T["isOwner"] extends false
	? {
			joinColumn: {
				name: T["fromJoinName"];
				referencedColumnName: T["toJoinName"];
			};
	  }
	: {
			joinColumn?: undefined;
	  });

export type OneToManyRelation<
	T extends {
		from: {
			entity: () => TypedEntitySchema<any>;
			primaryColumn: PrimaryColumn<any>;
			relationName: string;
		};
		to: {
			entity: () => TypedEntitySchema<any>;
			columnName: string;
			relationName: string;
			nullable: boolean;
		};
	}
> = {
	from: {
		relation: Relation<{
			name: T["from"]["relationName"];
			entity: ReturnType<T["to"]["entity"]>;
			type: "one-to-many";
			fromJoinName: T["from"]["primaryColumn"]["name"];
			toJoinName: T["to"]["columnName"];
			inverseSide: T["to"]["relationName"];
			isOwner: true;
		}>;
	};
	to: {
		column: Column<{
			name: T["to"]["columnName"];
			type: T["from"]["primaryColumn"]["type"];
			nullable: T["to"]["nullable"] extends false ? false : true;
		}>;
		relation: Relation<{
			name: T["to"]["relationName"];
			entity: ReturnType<T["from"]["entity"]>;
			type: "many-to-one";
			fromJoinName: T["to"]["columnName"];
			toJoinName: T["from"]["primaryColumn"]["name"];
			inverseSide: T["from"]["relationName"];
			isOwner: false;
		}>;
	};
};

export type Relations = Record<string, Relation<any>>;

export type DefaultTypedEntitySchemaTypeArg = {
	columns: Columns;
	relations: Relations;
	name: string;
};
export type TypedEntitySchema<
	T extends DefaultTypedEntitySchemaTypeArg = DefaultTypedEntitySchemaTypeArg
> = EntitySchema<T["columns"] & T["relations"]> & {
	_TColumns?: T["columns"];
	_TRelations?: T["relations"];
	_TName?: T["name"];
};

export type EntityRow<T extends TypedEntitySchema> = {
	[K in keyof Exclude<T["_TColumns"], undefined>]: Exclude<
		T["_TColumns"],
		undefined
	>[K]["type"] extends keyof ColumnTypeMap
		? Exclude<T["_TColumns"], undefined>[K] extends { primary: true }
			? ColumnTypeMap[Exclude<T["_TColumns"], undefined>[K]["type"]]
			: Exclude<T["_TColumns"], undefined>[K] extends { nullable: boolean }
			? Exclude<T["_TColumns"], undefined>[K]["nullable"] extends false
				? ColumnTypeMap[Exclude<T["_TColumns"], undefined>[K]["type"]]
				: ColumnTypeMap[Exclude<T["_TColumns"], undefined>[K]["type"]] | null
			: never
		: never;
};

export const createTypedEntitySchema = <T extends TypedEntitySchema>(options: {
	name: Exclude<T["_TName"], undefined>;
	columns: Exclude<T["_TColumns"], undefined>;
	relations: Exclude<T["_TRelations"], undefined>;
}): T => new EntitySchema(options) as any;
