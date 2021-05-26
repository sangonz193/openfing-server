import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { Connection } from "typeorm"

import {
	deleteCourseClassLiveStateByCourseClassId,
	DeleteCourseClassLiveStateByCourseClassIdOptions,
} from "./deleteCourseClassLiveStateByCourseClassId"
import {
	findCourseClassLiveStateByCourseClassIdBatch,
	FindCourseClassLiveStateByCourseClassIdBatchOptions,
} from "./findCourseClassLiveStateByCourseClassId"
import { insertCourseClassLiveState, InsertCourseClassLiveStateOptions } from "./insertCourseClassLiveState"

export type CourseClassLiveStateRepository = ReturnType<typeof getCourseClassLiveStateRepository>

export function getCourseClassLiveStateRepository(connection: Connection) {
	return {
		findCourseClassLiveStateByCourseClassId: (
			options: SafeOmit<FindCourseClassLiveStateByCourseClassIdBatchOptions, "connection">
		) => findCourseClassLiveStateByCourseClassIdBatch({ connection, ...options }),

		insertCourseClassLiveState: (options: SafeOmit<InsertCourseClassLiveStateOptions, "connection">) =>
			insertCourseClassLiveState({
				connection,
				...options,
			}),

		deleteCourseClassLiveStateByCourseClassId: (
			options: SafeOmit<DeleteCourseClassLiveStateByCourseClassIdOptions, "connection">
		) => deleteCourseClassLiveStateByCourseClassId({ connection, ...options }),
	}
}
