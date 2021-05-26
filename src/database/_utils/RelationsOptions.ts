import { UnionToIntersection } from "@sangonz193/utils/UnionToIntersection"

import { NamedRelations } from "./NamedRelations"
import { RelationOptions } from "./RelationOptions"

export type RelationsOptions<TNamedRelations extends NamedRelations<any>> = UnionToIntersection<
	{
		[TRelationKey in keyof TNamedRelations]: {
			[TColumnKey_ in TRelationKey]: RelationOptions<TNamedRelations[TColumnKey_]>
		}
	}[keyof TNamedRelations]
>
