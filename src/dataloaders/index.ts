import { Pool } from "pg"
import { Connection } from "typeorm"

import {
	CourseClassLiveStateDataLoader,
	getCourseClassLiveStateDataLoader,
} from "../database/CourseClassLiveState/CourseClassLiveState.dataLoader"
import {
	EmailValidationDataLoader,
	getEmailValidationDataLoader,
} from "../database/EmailValidation/EmailValidation.dataLoader"
import { Repositories } from "../database/repositories"
import { CourseDataLoader, getCourseDataLoader } from "./Course.dataLoader"
import { CourseClassDataLoader, getCourseClassDataLoader } from "./CourseClass.dataLoader"
import { CourseClassChapterCueDataLoader, getCourseClassChapterCueDataLoader } from "./CourseClassChapterCue.dataLoader"
import { CourseClassListDataLoader, getCourseClassListDataLoader } from "./CourseClassList.dataLoader"
import { CourseClassVideoDataLoader, getCourseClassVideoDataLoader } from "./CourseClassVideo.dataLoader"
import {
	CourseClassVideoFormatDataLoader,
	getCourseClassVideoFormatDataLoader,
} from "./CourseClassVideoFormat.dataLoader"
import {
	CourseClassVideoQualityDataLoader,
	getCourseClassVideoQualityDataLoader,
} from "./CourseClassVideoQuality.dataLoader"
import { CourseEditionDataLoader, getCourseEditionDataLoader } from "./CourseEdition.dataLoader"
import { getUserDataLoader, UserDataLoader } from "./User.dataLoader"

export type DataLoaders = {
	course: CourseDataLoader
	courseClass: CourseClassDataLoader
	courseClassChapterCue: CourseClassChapterCueDataLoader
	courseClassList: CourseClassListDataLoader
	courseClassLiveState: CourseClassLiveStateDataLoader
	courseClassVideo: CourseClassVideoDataLoader
	courseClassVideoFormat: CourseClassVideoFormatDataLoader
	courseClassVideoQuality: CourseClassVideoQualityDataLoader
	courseEdition: CourseEditionDataLoader
	emailValidation: EmailValidationDataLoader
	user: UserDataLoader
}

export const getDataLoaders = (repositories: Repositories, connection: Connection, pool: Pool): DataLoaders => ({
	course: getCourseDataLoader(repositories.course),
	courseClass: getCourseClassDataLoader(repositories.courseClass),
	courseClassChapterCue: getCourseClassChapterCueDataLoader(repositories.courseClassChapterCue),
	courseClassList: getCourseClassListDataLoader(repositories.courseClassList),
	courseClassLiveState: getCourseClassLiveStateDataLoader(connection),
	courseClassVideo: getCourseClassVideoDataLoader(repositories.courseClassVideo),
	courseClassVideoFormat: getCourseClassVideoFormatDataLoader(repositories.courseClassVideoFormat),
	courseClassVideoQuality: getCourseClassVideoQualityDataLoader(repositories.courseClassVideoQuality),
	courseEdition: getCourseEditionDataLoader(repositories.courseEdition),
	emailValidation: getEmailValidationDataLoader(pool),
	user: getUserDataLoader(repositories.user),
})
