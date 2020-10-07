import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import { CourseClass, CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";

export type CourseClassAccessOptions = {
	includeHidden?: boolean;
	includeDisabled?: boolean;
};

export type CourseClassFindOneOptions = CourseClassAccessOptions & {
	id: CourseClassRow["id"];
};

export type CourseClassFindAllOptions =
	| (CourseClassAccessOptions & {
			courseClassListId: CourseClassRow["courseClassListId"];
	  })
	| { latest: number };

export type SaveCourseClassData = SafeOmit<CourseClassRow, "id">;

export type CreateCourseClassData = SafeOmit<
	CourseClassRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<Pick<CourseClassRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">>;

export type CourseClassRepository = {
	_typedRepository: TypedRepository<CourseClass>;

	findAll: (options: CourseClassFindAllOptions) => Promise<CourseClassRow[]>;
	findBatch: (options: readonly CourseClassFindOneOptions[]) => Promise<Array<CourseClassRow | null>>;

	is: (courseClass: CourseClassRow, findOptions: CourseClassFindOneOptions) => boolean;

	create: (data: CreateCourseClassData) => SaveCourseClassData;
	save: (data: SaveCourseClassData) => Promise<CourseClassRow>;
};
