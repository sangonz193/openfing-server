import { getUuid } from "@sangonz193/utils/getUuid"
import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import identity from "lodash/identity"
import { Connection } from "typeorm"

import { courseClassLiveStateEntitySchema } from "./CourseClassLiveState.entity"
import { CourseClassLiveStateRow } from "./CourseClassLiveState.entity.types"

type NullableInsertCourseClassLiveStateDataKeys = "id"
export type InsertCourseClassLiveStateData = SafeOmit<
	CourseClassLiveStateRow,
	NullableInsertCourseClassLiveStateDataKeys
> &
	Partial<Pick<CourseClassLiveStateRow, NullableInsertCourseClassLiveStateDataKeys>>

export type InsertCourseClassLiveStateOptions = {
	connection: Connection
	data: InsertCourseClassLiveStateData
}

export async function insertCourseClassLiveState(
	options: InsertCourseClassLiveStateOptions
): Promise<CourseClassLiveStateRow> {
	const { connection, data } = options

	const { generatedMaps } = await connection
		.createQueryBuilder()
		.insert()
		.into<CourseClassLiveStateRow>(courseClassLiveStateEntitySchema)
		.values(
			identity<CourseClassLiveStateRow>({
				...data,
				id: data.id ?? getUuid(),
			})
		)
		.returning("*")
		.execute()

	return generatedMaps[0] as CourseClassLiveStateRow
}
