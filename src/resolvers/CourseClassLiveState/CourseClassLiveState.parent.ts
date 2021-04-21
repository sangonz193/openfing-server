import { CourseClassLiveStateRow } from "../../entities/CourseClassLiveState/CourseClassLiveState.entity.types";
import { CourseClassLiveState } from "../../generated/graphql.types";

export type CourseClassLiveStateParent = Required<CourseClassLiveStateRow> &
	Pick<Required<CourseClassLiveState>, "__typename" | "startDate" | "html" | "isProgress" | "id">;

export const getCourseClassLiveStateParent = (row: CourseClassLiveStateRow): CourseClassLiveStateParent => ({
	...row,
	__typename: "CourseClassLiveState",
	isProgress: row.in_progress,
	startDate: row.start_date?.toISOString() || null,
});
