import { Connection } from "typeorm"

import { getFindCourseClassLiveStateByCourseClassIdBatchDataLoader } from "./findCourseClassLiveStateByCourseClassId"

export type CourseClassLiveStateDataLoader = ReturnType<typeof getCourseClassLiveStateDataLoader>

export function getCourseClassLiveStateDataLoader(connection: Connection) {
	return {
		findCourseClassLiveStateByCourseClassId: getFindCourseClassLiveStateByCourseClassIdBatchDataLoader(connection),
	}
}
