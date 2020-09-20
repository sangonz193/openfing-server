import { Course } from "./Course";
import { CourseClass } from "./CourseClass";
import { CourseClassList } from "./CourseClassList";
import { CourseClassVideo } from "./CourseClassVideo";
import { CourseClassVideoFormat } from "./CourseClassVideoFormat";
import { CourseClassVideoQuality } from "./CourseClassVideoQuality";
import { CourseEdition } from "./CourseEdition";
import { Faq } from "./Faq";
import { User } from "./User";
import { UserRole } from "./UserRole";
import { UserToUserRole } from "./UserToUserRole";

export const entities = [
	User,
	Course,
	CourseEdition,
	CourseClassList,
	CourseClass,
	CourseClassVideo,
	CourseClassVideoQuality,
	CourseClassVideoFormat,
	Faq,
	UserRole,
	UserToUserRole,
];
