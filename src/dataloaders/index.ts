import { Repositories } from "../database/repositories";
import { CourseDataLoader, getCourseDataLoader } from "./Course.dataLoader";
import { CourseClassDataLoader, getCourseClassDataLoader } from "./CourseClass.dataLoader";
import {
	CourseClassChapterCueDataLoader,
	getCourseClassChapterCueDataLoader,
} from "./CourseClassChapterCue.dataLoader";
import { CourseClassListDataLoader, getCourseClassListDataLoader } from "./CourseClassList.dataLoader";
import { CourseClassVideoDataLoader, getCourseClassVideoDataLoader } from "./CourseClassVideo.dataLoader";
import {
	CourseClassVideoFormatDataLoader,
	getCourseClassVideoFormatDataLoader,
} from "./CourseClassVideoFormat.dataLoader";
import {
	CourseClassVideoQualityDataLoader,
	getCourseClassVideoQualityDataLoader,
} from "./CourseClassVideoQuality.dataLoader";
import { CourseEditionDataLoader, getCourseEditionDataLoader } from "./CourseEdition.dataLoader";
import { getUserDataLoader, UserDataLoader } from "./User.dataLoader";

export type DataLoaders = {
	course: CourseDataLoader;
	courseClass: CourseClassDataLoader;
	courseClassChapterCue: CourseClassChapterCueDataLoader;
	courseClassVideo: CourseClassVideoDataLoader;
	courseClassVideoFormat: CourseClassVideoFormatDataLoader;
	courseClassVideoQuality: CourseClassVideoQualityDataLoader;
	courseClassList: CourseClassListDataLoader;
	courseEdition: CourseEditionDataLoader;
	user: UserDataLoader;
};

export const getDataLoaders = (repositories: Repositories) => ({
	course: getCourseDataLoader(repositories.course),
	courseClass: getCourseClassDataLoader(repositories.courseClass),
	courseClassChapterCue: getCourseClassChapterCueDataLoader(repositories.courseClassChapterCue),
	courseClassVideo: getCourseClassVideoDataLoader(repositories.courseClassVideo),
	courseClassVideoFormat: getCourseClassVideoFormatDataLoader(repositories.courseClassVideoFormat),
	courseClassVideoQuality: getCourseClassVideoQualityDataLoader(repositories.courseClassVideoQuality),
	courseClassList: getCourseClassListDataLoader(repositories.courseClassList),
	courseEdition: getCourseEditionDataLoader(repositories.courseEdition),
	user: getUserDataLoader(repositories.user),
});
