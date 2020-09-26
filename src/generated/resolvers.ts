import Course_createdByResolver from "../resolvers/Course/createdBy.resolver";
import Course_deletedByResolver from "../resolvers/Course/deletedBy.resolver";
import Course_editionsResolver from "../resolvers/Course/editions.resolver";
import Course_iconUrlResolver from "../resolvers/Course/iconUrl.resolver";
import Course_idResolver from "../resolvers/Course/id.resolver";
import Course_updatedByResolver from "../resolvers/Course/updatedBy.resolver";
import CourseClass_courseClassListResolver from "../resolvers/CourseClass/courseClassList.resolver";
import CourseClass_createdByResolver from "../resolvers/CourseClass/createdBy.resolver";
import CourseClass_deletedByResolver from "../resolvers/CourseClass/deletedBy.resolver";
import CourseClass_idResolver from "../resolvers/CourseClass/id.resolver";
import CourseClass_updatedByResolver from "../resolvers/CourseClass/updatedBy.resolver";
import CourseClass_videosResolver from "../resolvers/CourseClass/videos.resolver";
import CourseClassList_classesResolver from "../resolvers/CourseClassList/classes.resolver";
import CourseClassList_courseEditionResolver from "../resolvers/CourseClassList/courseEdition.resolver";
import CourseClassList_createdByResolver from "../resolvers/CourseClassList/createdBy.resolver";
import CourseClassList_deletedByResolver from "../resolvers/CourseClassList/deletedBy.resolver";
import CourseClassList_idResolver from "../resolvers/CourseClassList/id.resolver";
import CourseClassList_updatedByResolver from "../resolvers/CourseClassList/updatedBy.resolver";
import CourseClassVideo_courseClassResolver from "../resolvers/CourseClassVideo/courseClass.resolver";
import CourseClassVideo_createdByResolver from "../resolvers/CourseClassVideo/createdBy.resolver";
import CourseClassVideo_deletedByResolver from "../resolvers/CourseClassVideo/deletedBy.resolver";
import CourseClassVideo_idResolver from "../resolvers/CourseClassVideo/id.resolver";
import CourseClassVideo_qualitiesResolver from "../resolvers/CourseClassVideo/qualities.resolver";
import CourseClassVideo_updatedByResolver from "../resolvers/CourseClassVideo/updatedBy.resolver";
import CourseClassVideoFormat_createdByResolver from "../resolvers/CourseClassVideoFormat/createdBy.resolver";
import CourseClassVideoFormat_deletedByResolver from "../resolvers/CourseClassVideoFormat/deletedBy.resolver";
import CourseClassVideoFormat_hasTorrentResolver from "../resolvers/CourseClassVideoFormat/hasTorrent.resolver";
import CourseClassVideoFormat_idResolver from "../resolvers/CourseClassVideoFormat/id.resolver";
import CourseClassVideoFormat_qualityResolver from "../resolvers/CourseClassVideoFormat/quality.resolver";
import CourseClassVideoFormat_updatedByResolver from "../resolvers/CourseClassVideoFormat/updatedBy.resolver";
import CourseClassVideoQuality_createdByResolver from "../resolvers/CourseClassVideoQuality/createdBy.resolver";
import CourseClassVideoQuality_deletedByResolver from "../resolvers/CourseClassVideoQuality/deletedBy.resolver";
import CourseClassVideoQuality_formatsResolver from "../resolvers/CourseClassVideoQuality/formats.resolver";
import CourseClassVideoQuality_idResolver from "../resolvers/CourseClassVideoQuality/id.resolver";
import CourseClassVideoQuality_updatedByResolver from "../resolvers/CourseClassVideoQuality/updatedBy.resolver";
import CourseClassVideoQuality_videoResolver from "../resolvers/CourseClassVideoQuality/video.resolver";
import CourseEdition_courseResolver from "../resolvers/CourseEdition/course.resolver";
import CourseEdition_courseClassListsResolver from "../resolvers/CourseEdition/courseClassLists.resolver";
import CourseEdition_createdByResolver from "../resolvers/CourseEdition/createdBy.resolver";
import CourseEdition_deletedByResolver from "../resolvers/CourseEdition/deletedBy.resolver";
import CourseEdition_idResolver from "../resolvers/CourseEdition/id.resolver";
import CourseEdition_updatedByResolver from "../resolvers/CourseEdition/updatedBy.resolver";
import Faq_createdByResolver from "../resolvers/Faq/createdBy.resolver";
import Faq_deletedByResolver from "../resolvers/Faq/deletedBy.resolver";
import Faq_updatedByResolver from "../resolvers/Faq/updatedBy.resolver";
import Mutation_backupDbResolver from "../resolvers/Mutation/backupDb.resolver";
import Mutation_createCourseResolver from "../resolvers/Mutation/createCourse.resolver";
import Mutation_updateCourseClassVideosResolver from "../resolvers/Mutation/updateCourseClassVideos.resolver";
import Query_courseByCodeResolver from "../resolvers/Query/courseByCode.resolver";
import Query_courseByIdResolver from "../resolvers/Query/courseById.resolver";
import Query_courseClassByIdResolver from "../resolvers/Query/courseClassById.resolver";
import Query_courseClassListByCodeResolver from "../resolvers/Query/courseClassListByCode.resolver";
import Query_courseClassListByIdResolver from "../resolvers/Query/courseClassListById.resolver";
import Query_courseEditionByIdResolver from "../resolvers/Query/courseEditionById.resolver";
import Query_coursesResolver from "../resolvers/Query/courses.resolver";
import Query_faqsResolver from "../resolvers/Query/faqs.resolver";
import Query_latestCourseClassesResolver from "../resolvers/Query/latestCourseClasses.resolver";
import Query_userRolesResolver from "../resolvers/Query/userRoles.resolver";
import User_idResolver from "../resolvers/User/id.resolver";
import User_rolesResolver from "../resolvers/User/roles.resolver";
import UserRole_idResolver from "../resolvers/UserRole/id.resolver";
import VoidResolver from "../resolvers/Void.resolver";
import { Resolvers } from "./graphql.types";

const __resolveType = <T>({ __typename }: { __typename: T }) => __typename;

export const resolvers: Resolvers = {
	AuthenticationError: {
		_: () => null,
	},
	Course: {
		createdBy: Course_createdByResolver,
		deletedBy: Course_deletedByResolver,
		editions: Course_editionsResolver,
		iconUrl: Course_iconUrlResolver,
		id: Course_idResolver,
		updatedBy: Course_updatedByResolver,
	},
	CourseByCodeResult: {
		__resolveType,
	},
	CourseByIdResult: {
		__resolveType,
	},
	CourseClass: {
		courseClassList: CourseClass_courseClassListResolver,
		createdBy: CourseClass_createdByResolver,
		deletedBy: CourseClass_deletedByResolver,
		id: CourseClass_idResolver,
		updatedBy: CourseClass_updatedByResolver,
		videos: CourseClass_videosResolver,
	},
	CourseClassByIdResult: {
		__resolveType,
	},
	CourseClassList: {
		classes: CourseClassList_classesResolver,
		courseEdition: CourseClassList_courseEditionResolver,
		createdBy: CourseClassList_createdByResolver,
		deletedBy: CourseClassList_deletedByResolver,
		id: CourseClassList_idResolver,
		updatedBy: CourseClassList_updatedByResolver,
	},
	CourseClassListByCodeResult: {
		__resolveType,
	},
	CourseClassListByIdResult: {
		__resolveType,
	},
	CourseClassVideo: {
		courseClass: CourseClassVideo_courseClassResolver,
		createdBy: CourseClassVideo_createdByResolver,
		deletedBy: CourseClassVideo_deletedByResolver,
		id: CourseClassVideo_idResolver,
		qualities: CourseClassVideo_qualitiesResolver,
		updatedBy: CourseClassVideo_updatedByResolver,
	},
	CourseClassVideoFormat: {
		createdBy: CourseClassVideoFormat_createdByResolver,
		deletedBy: CourseClassVideoFormat_deletedByResolver,
		hasTorrent: CourseClassVideoFormat_hasTorrentResolver,
		id: CourseClassVideoFormat_idResolver,
		quality: CourseClassVideoFormat_qualityResolver,
		updatedBy: CourseClassVideoFormat_updatedByResolver,
	},
	CourseClassVideoQuality: {
		createdBy: CourseClassVideoQuality_createdByResolver,
		deletedBy: CourseClassVideoQuality_deletedByResolver,
		formats: CourseClassVideoQuality_formatsResolver,
		id: CourseClassVideoQuality_idResolver,
		updatedBy: CourseClassVideoQuality_updatedByResolver,
		video: CourseClassVideoQuality_videoResolver,
	},
	CourseEdition: {
		course: CourseEdition_courseResolver,
		courseClassLists: CourseEdition_courseClassListsResolver,
		createdBy: CourseEdition_createdByResolver,
		deletedBy: CourseEdition_deletedByResolver,
		id: CourseEdition_idResolver,
		updatedBy: CourseEdition_updatedByResolver,
	},
	CourseEditionByIdResult: {
		__resolveType,
	},
	CreateCoursePayload: {
		__resolveType,
	},
	Faq: {
		createdBy: Faq_createdByResolver,
		deletedBy: Faq_deletedByResolver,
		updatedBy: Faq_updatedByResolver,
	},
	GenericError: {
		_: () => null,
	},
	Mutation: {
		_: () => null,
		backupDb: Mutation_backupDbResolver,
		createCourse: Mutation_createCourseResolver,
		updateCourseClassVideos: Mutation_updateCourseClassVideosResolver,
	},
	NotFoundError: {
		_: () => null,
	},
	Query: {
		_: () => null,
		courseByCode: Query_courseByCodeResolver,
		courseById: Query_courseByIdResolver,
		courseClassById: Query_courseClassByIdResolver,
		courseClassListByCode: Query_courseClassListByCodeResolver,
		courseClassListById: Query_courseClassListByIdResolver,
		courseEditionById: Query_courseEditionByIdResolver,
		courses: Query_coursesResolver,
		faqs: Query_faqsResolver,
		latestCourseClasses: Query_latestCourseClassesResolver,
		userRoles: Query_userRolesResolver,
	},
	UpdateCourseClassVideosResult: {
		__resolveType,
	},
	User: {
		id: User_idResolver,
		roles: User_rolesResolver,
	},
	UserRole: {
		id: UserRole_idResolver,
	},
	Void: VoidResolver,
};
