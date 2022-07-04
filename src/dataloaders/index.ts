import { Pool } from "pg"
import { Connection } from "typeorm"

import {
	CourseClassChapterCueDataLoader,
	getCourseClassChapterCueDataLoader,
} from "../database/CourseClassChapterCue/CourseClassChapterCue.dataLoader"
import {
	CourseClassLiveStateDataLoader,
	getCourseClassLiveStateDataLoader,
} from "../database/CourseClassLiveState/CourseClassLiveState.dataLoader"
import {
	EmailValidationDataLoader,
	getEmailValidationDataLoader,
} from "../database/EmailValidation/EmailValidation.dataLoader"
import { getPostDataLoader, PostDataLoader } from "../database/Post/Post.dataLoader"
import { Repositories } from "../database/repositories"
import { CourseDataLoader, getCourseDataLoader } from "./Course.dataLoader"
import { CourseClassDataLoader, getCourseClassDataLoader } from "./CourseClass.dataLoader"
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
	post: PostDataLoader
}

export const getDataLoaders = (repositories: Repositories, connection: Connection, pool: Pool): DataLoaders => ({
	course: getCourseDataLoader(repositories.course),
	courseClass: getCourseClassDataLoader(repositories.courseClass),
	courseClassChapterCue: getCourseClassChapterCueDataLoader(pool),
	courseClassList: getCourseClassListDataLoader(repositories.courseClassList),
	courseClassLiveState: getCourseClassLiveStateDataLoader(connection),
	courseClassVideo: getCourseClassVideoDataLoader(repositories.courseClassVideo),
	courseClassVideoFormat: getCourseClassVideoFormatDataLoader(repositories.courseClassVideoFormat),
	courseClassVideoQuality: getCourseClassVideoQualityDataLoader(repositories.courseClassVideoQuality),
	courseEdition: getCourseEditionDataLoader(repositories.courseEdition),
	emailValidation: getEmailValidationDataLoader(pool),
	post: getPostDataLoader(pool),
})
