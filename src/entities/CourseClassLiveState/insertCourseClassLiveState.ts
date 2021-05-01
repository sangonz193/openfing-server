import identity from "lodash/identity";
import { Connection } from "typeorm";

import { getUuid } from "../../_utils/getUuid";
import { SafeOmit } from "../../_utils/utilTypes";
import { courseClassLiveStateEntitySchema } from "./CourseClassLiveState.entity";
import { CourseClassLiveStateRow } from "./CourseClassLiveState.entity.types";

type NullableInsertCourseClassLiveStateDataKeys = "id";
export type InsertCourseClassLiveStateData = SafeOmit<
	CourseClassLiveStateRow,
	NullableInsertCourseClassLiveStateDataKeys
> &
	Partial<Pick<CourseClassLiveStateRow, NullableInsertCourseClassLiveStateDataKeys>>;

export async function insertCourseClassLiveState(
	connection: Connection,
	data: InsertCourseClassLiveStateData
): Promise<CourseClassLiveStateRow> {
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
		.execute();

	return generatedMaps[0] as CourseClassLiveStateRow;
}
