import identity from "lodash/identity"
import { Connection } from "typeorm"

import { courseClassLiveStateColumns, courseClassLiveStateEntitySchema } from "./CourseClassLiveState.entity"
import { CourseClassLiveStateRow } from "./CourseClassLiveState.entity.types"

export type DeleteCourseClassLiveStateByCourseClassIdOptions = {
	connection: Connection
	courseClassId: string
}

export async function deleteCourseClassLiveStateByCourseClassId(
	options: DeleteCourseClassLiveStateByCourseClassIdOptions
): Promise<boolean> {
	const { connection, courseClassId } = options
	const rows = await connection
		.createQueryBuilder(courseClassLiveStateEntitySchema, "liveState")
		.delete()
		.from(courseClassLiveStateEntitySchema)
		.where(
			`${courseClassLiveStateColumns.course_class_id.name} = :id`,
			identity<{ id: CourseClassLiveStateRow["id"] }>({ id: courseClassId })
		)
		.execute()

	return (rows.affected ?? 0) > 0
}
