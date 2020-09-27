import { DocumentNode } from "graphql";

import BaseDoc from "../schemas/Base.schema";
import CourseDoc from "../schemas/Course.schema";
import CourseClassDoc from "../schemas/CourseClass.schema";
import CourseClassListDoc from "../schemas/CourseClassList.schema";
import CourseClassVideoDoc from "../schemas/CourseClassVideo.schema";
import CourseClassVideoFormatDoc from "../schemas/CourseClassVideoFormat.schema";
import CourseClassVideoQualityDoc from "../schemas/CourseClassVideoQuality.schema";
import CourseEditionDoc from "../schemas/CourseEdition.schema";
import FaqDoc from "../schemas/Faq.schema";
import backupDbDoc from "../schemas/Mutation/backupDb.schema";
import createCourseDoc from "../schemas/Mutation/createCourse.schema";
import courseByCodeDoc from "../schemas/Query/courseByCode.schema";
import courseByIdDoc from "../schemas/Query/courseById.schema";
import courseClassByIdDoc from "../schemas/Query/courseClassById.schema";
import courseClassListByCodeDoc from "../schemas/Query/courseClassListByCode.schema";
import courseClassListByIdDoc from "../schemas/Query/courseClassListById.schema";
import courseEditionByIdDoc from "../schemas/Query/courseEditionById.schema";
import coursesDoc from "../schemas/Query/courses.schema";
import faqsDoc from "../schemas/Query/faqs.schema";
import latestCourseClassesDoc from "../schemas/Query/latestCourseClasses.schema";
import QueryDoc from "../schemas/Query/Query.schema";
import updateCourseClassVideosDoc from "../schemas/Query/updateCourseClassVideos.schema";
import userRolesDoc from "../schemas/Query/userRoles.schema";
import UserDoc from "../schemas/User.schema";
import UserRoleDoc from "../schemas/UserRole.schema";

export const typeDefs: DocumentNode[] = [
	BaseDoc,
	CourseDoc,
	CourseClassDoc,
	CourseClassListDoc,
	CourseClassVideoDoc,
	CourseClassVideoFormatDoc,
	CourseClassVideoQualityDoc,
	CourseEditionDoc,
	FaqDoc,
	backupDbDoc,
	createCourseDoc,
	courseByCodeDoc,
	courseByIdDoc,
	courseClassByIdDoc,
	courseClassListByCodeDoc,
	courseClassListByIdDoc,
	courseEditionByIdDoc,
	coursesDoc,
	faqsDoc,
	latestCourseClassesDoc,
	QueryDoc,
	updateCourseClassVideosDoc,
	userRolesDoc,
	UserDoc,
	UserRoleDoc,
];
