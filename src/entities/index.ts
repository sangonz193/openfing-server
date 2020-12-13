import { courseEntitySchema } from "./Course";
import { courseClassEntitySchema } from "./CourseClass";
import { courseClassChapterCueEntitySchema } from "./CourseClassChapterCue";
import { courseClassListEntitySchema } from "./CourseClassList";
import { courseClassVideoEntitySchema } from "./CourseClassVideo";
import { courseClassVideoFormatEntitySchema } from "./CourseClassVideoFormat";
import { courseClassVideoQualityEntitySchema } from "./CourseClassVideoQuality";
import { courseEditionEntitySchema } from "./CourseEdition";
import { faqEntitySchema } from "./Faq";
import { userEntitySchema } from "./User";
import { userRoleEntitySchema } from "./UserRole";
import { userToUserRoleEntitySchema } from "./UserToUserRole";

export const entities = [
	courseEntitySchema,
	courseClassEntitySchema,
	courseClassChapterCueEntitySchema,
	courseClassListEntitySchema,
	courseClassVideoEntitySchema,
	courseClassVideoFormatEntitySchema,
	courseClassVideoQualityEntitySchema,
	courseEditionEntitySchema,
	faqEntitySchema,
	userEntitySchema,
	userRoleEntitySchema,
	userToUserRoleEntitySchema,
];
