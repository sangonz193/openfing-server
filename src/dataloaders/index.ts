import { Connection } from "typeorm";

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
import { FaqDataLoader, getFaqDataLoader } from "./Faq.dataLoader";
import { getUserDataLoader, UserDataLoader } from "./User.dataLoader";
import { getUserRoleDataLoader, UserRoleDataLoader } from "./UserRole.dataLoader";

export type DataLoaders = {
	course: CourseDataLoader;
	courseClass: CourseClassDataLoader;
	courseClassChapterCue: CourseClassChapterCueDataLoader;
	courseClassVideo: CourseClassVideoDataLoader;
	courseClassVideoFormat: CourseClassVideoFormatDataLoader;
	courseClassVideoQuality: CourseClassVideoQualityDataLoader;
	courseClassList: CourseClassListDataLoader;
	courseEdition: CourseEditionDataLoader;
	faq: FaqDataLoader;
	user: UserDataLoader;
	userRole: UserRoleDataLoader;
};

export const getDataLoaders = (connection: Connection) => ({
	course: getCourseDataLoader(connection),
	courseClass: getCourseClassDataLoader(connection),
	courseClassChapterCue: getCourseClassChapterCueDataLoader(connection),
	courseClassVideo: getCourseClassVideoDataLoader(connection),
	courseClassVideoFormat: getCourseClassVideoFormatDataLoader(connection),
	courseClassVideoQuality: getCourseClassVideoQualityDataLoader(connection),
	courseClassList: getCourseClassListDataLoader(connection),
	courseEdition: getCourseEditionDataLoader(connection),
	faq: getFaqDataLoader(connection),
	user: getUserDataLoader(connection),
	userRole: getUserRoleDataLoader(connection),
});
