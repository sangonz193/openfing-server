import { Connection } from "typeorm"

import { getFindCourseClassLiveStateByCourseClassIdDataLoader } from "./findCourseClassLiveStateByCourseClassId"

export type CourseClassLiveStateDataLoader = ReturnType<typeof getCourseClassLiveStateDataLoader>

export function getCourseClassLiveStateDataLoader(connection: Connection) {
	return {
		findCourseClassLiveStateByCourseClassId: getFindCourseClassLiveStateByCourseClassIdDataLoader(connection),
	}
}
