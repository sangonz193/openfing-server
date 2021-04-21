import identity from "lodash/identity";
import { Connection } from "typeorm";

import { courseClassLiveStateColumns, courseClassLiveStateEntitySchema } from "./CourseClassLiveState.entity";
import { CourseClassLiveStateRow } from "./CourseClassLiveState.entity.types";

export async function findCourseClassLiveStateByCourseClassIdBatch(
	connection: Connection,
	courseClassIds: string[]
): Promise<Array<CourseClassLiveStateRow | null>> {
	const rows = await connection
		.createQueryBuilder()
		.from<CourseClassLiveStateRow>(courseClassLiveStateEntitySchema, "liveState")
		.where(
			`liveState.${courseClassLiveStateColumns.course_class_id.name} in (:...ids)`,
			identity<{ ids: Array<CourseClassLiveStateRow["id"]> }>({ ids: courseClassIds })
		)
		.getMany();

	return courseClassIds.map((id) => {
		return rows.find((row) => row.course_class_id === id) ?? null;
	});
}
