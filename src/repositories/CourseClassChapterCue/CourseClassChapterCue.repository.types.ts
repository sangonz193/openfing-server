import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import {
	CourseClassChapterCue,
	CourseClassChapterCueRow,
} from "../../entities/CourseClassChapterCue/CourseClassChapterCue.entity.types";

export type CourseClassChapterCueFindOneOptions = {
	id: CourseClassChapterCueRow["id"];
};

export type CourseClassChapterCueFindAllOptions = {
	courseClassId: CourseClassChapterCueRow["courseClassId"];
};

export type SaveCourseClassChapterCueData = CourseClassChapterCueRow;

export type CreateCourseClassChapterCueData = SafeOmit<
	CourseClassChapterCueRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<
		Pick<CourseClassChapterCueRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">
	>;

export type CourseClassChapterCueRepository = {
	_typedRepository: TypedRepository<CourseClassChapterCue>;

	findAll: (options: CourseClassChapterCueFindAllOptions) => Promise<CourseClassChapterCueRow[]>;
	findBatch: (
		options: readonly CourseClassChapterCueFindOneOptions[]
	) => Promise<Array<CourseClassChapterCueRow | null>>;

	is: (courseClassChapterCue: CourseClassChapterCueRow, findOptions: CourseClassChapterCueFindOneOptions) => boolean;

	create: (data: CreateCourseClassChapterCueData) => SaveCourseClassChapterCueData;
	save: (data: SaveCourseClassChapterCueData) => Promise<CourseClassChapterCueRow>;
};
