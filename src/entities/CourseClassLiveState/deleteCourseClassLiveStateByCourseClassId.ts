import identity from "lodash/identity";
import { Connection } from "typeorm";

import { courseClassLiveStateColumns, courseClassLiveStateEntitySchema } from "./CourseClassLiveState.entity";
import { CourseClassLiveStateRow } from "./CourseClassLiveState.entity.types";

export async function deleteCourseClassLiveStateByCourseClassId(
	connection: Connection,
	courseClassId: string
): Promise<boolean> {
	const rows = await connection
		.createQueryBuilder(courseClassLiveStateEntitySchema, "liveState")
		.delete()
		.from(courseClassLiveStateEntitySchema)
		.where(
			`${courseClassLiveStateColumns.course_class_id.name} = :id`,
			identity<{ id: CourseClassLiveStateRow["id"] }>({ id: courseClassId })
		)
		.execute();

	return (rows.affected ?? 0) > 0;
}
