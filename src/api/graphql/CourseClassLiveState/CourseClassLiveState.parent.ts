import { CourseClassLiveStateRow } from "../../../database/CourseClassLiveState/CourseClassLiveState.entity.types"
import { CourseClassLiveState } from "../schemas.types"

export type CourseClassLiveStateParent = Required<CourseClassLiveStateRow> &
	Pick<Required<CourseClassLiveState>, "__typename" | "startDate" | "html" | "inProgress" | "id">

export const getCourseClassLiveStateParent = (row: CourseClassLiveStateRow): CourseClassLiveStateParent => ({
	...row,
	__typename: "CourseClassLiveState",
	inProgress: row.in_progress,
	startDate: row.start_date || null,
})
