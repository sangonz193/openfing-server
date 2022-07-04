import { UnionToIntersection } from "@sangonz193/utils/UnionToIntersection"

import { ColumnOptions } from "./ColumnOptions"
import { NamedColumns } from "./NamedColumns"

export type ColumnsOptions<TNamedColumns extends NamedColumns<any>> = UnionToIntersection<
	{
		[TColumnKey in keyof TNamedColumns]: {
			[TColumnKey_ in TColumnKey]: ColumnOptions<TNamedColumns[TColumnKey_]>
		}
	}[keyof TNamedColumns]
>
