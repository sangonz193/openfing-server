import { Connection } from "typeorm";

import { getCourseRepository } from "./Course";
import { CourseRepository } from "./Course/Course.repository.types";
import { getCourseClassRepository } from "./CourseClass";
import { CourseClassRepository } from "./CourseClass/CourseClass.repository.types";
import { getCourseClassChapterCueRepository } from "./CourseClassChapterCue";
import { CourseClassChapterCueRepository } from "./CourseClassChapterCue/CourseClassChapterCue.repository.types";
import { getCourseClassListRepository } from "./CourseClassList";
import { CourseClassListRepository } from "./CourseClassList/CourseClassList.repository.types";
import { getCourseClassVideoRepository } from "./CourseClassVideo";
import { CourseClassVideoRepository } from "./CourseClassVideo/CourseClassVideo.repository.types";
import { getCourseClassVideoFormatRepository } from "./CourseClassVideoFormat";
import { CourseClassVideoFormatRepository } from "./CourseClassVideoFormat/CourseClassVideoFormat.repository.types";
import { getCourseClassVideoQualityRepository } from "./CourseClassVideoQuality";
import { CourseClassVideoQualityRepository } from "./CourseClassVideoQuality/CourseClassVideoQuality.repository.types";
import { getCourseEditionRepository } from "./CourseEdition";
import { CourseEditionRepository } from "./CourseEdition/CourseEdition.repository.types";
import { getFaqRepository } from "./Faq";
import { FaqRepository } from "./Faq/Faq.repository.types";
import { getUserRepository } from "./User";
import { UserRepository } from "./User/User.repository.types";
import { getUserRoleRepository } from "./UserRole";
import { UserRoleRepository } from "./UserRole/UserRole.repository.types";

export type Repositories = {
	course: CourseRepository;
	courseClass: CourseClassRepository;
	courseClassChapterCue: CourseClassChapterCueRepository;
	courseClassVideo: CourseClassVideoRepository;
	courseClassVideoFormat: CourseClassVideoFormatRepository;
	courseClassVideoQuality: CourseClassVideoQualityRepository;
	courseClassList: CourseClassListRepository;
	courseEdition: CourseEditionRepository;
	faq: FaqRepository;
	user: UserRepository;
	userRole: UserRoleRepository;
};

export const getRepositories = (connection: Connection): Repositories => ({
	course: getCourseRepository(connection),
	courseClass: getCourseClassRepository(connection),
	courseClassChapterCue: getCourseClassChapterCueRepository(connection),
	courseClassVideo: getCourseClassVideoRepository(connection),
	courseClassVideoFormat: getCourseClassVideoFormatRepository(connection),
	courseClassVideoQuality: getCourseClassVideoQualityRepository(connection),
	courseClassList: getCourseClassListRepository(connection),
	courseEdition: getCourseEditionRepository(connection),
	faq: getFaqRepository(connection),
	user: getUserRepository(connection),
	userRole: getUserRoleRepository(connection),
});
