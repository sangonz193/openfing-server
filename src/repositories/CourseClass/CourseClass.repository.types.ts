import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import { CourseClass, CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import { CourseClassListRow } from "../../entities/CourseClassList/CourseClassList.entity.types";

export type CourseClassRef =
	| {
			id: CourseClassRow["id"];
	  }
	| {
			courseClassListId: CourseClassListRow["id"];
			number: Exclude<CourseClassRow["number"], null>;
	  };

export type CourseClassAccessOptions = {
	includeHidden?: boolean;
	includeDisabled?: boolean;
};

export type CourseClassFindOneOptions = CourseClassAccessOptions & CourseClassRef;

export type CourseClassFindAllOptions =
	| (CourseClassAccessOptions & {
			courseClassListId: CourseClassRow["courseClassListId"];
	  })
	| { latest: number };

export type InsertCourseClassData = SafeOmit<CourseClassRow, "id">;

export type CreateCourseClassData = SafeOmit<
	CourseClassRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<Pick<CourseClassRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">>;

export type CourseClassRepository = {
	_typedRepository: TypedRepository<CourseClass>;

	findOne: (options: CourseClassFindOneOptions) => Promise<CourseClassRow | null>;
	findBatch: (options: readonly CourseClassFindOneOptions[]) => Promise<Array<CourseClassRow | null>>;
	findAll: (options: CourseClassFindAllOptions) => Promise<CourseClassRow[]>;

	is: (courseClass: CourseClassRow, findOptions: CourseClassFindOneOptions) => boolean;

	create: (data: CreateCourseClassData) => InsertCourseClassData;
	insert: (data: InsertCourseClassData) => Promise<CourseClassRow>;
	createAndInsert: (data: CreateCourseClassData) => Promise<CourseClassRow>;

	update: (id: CourseClassRow["id"], newValues: Partial<SafeOmit<CourseClassRow, "id">>) => Promise<CourseClassRow>;

	delete: (id: CourseClassRow["id"], data: Pick<Required<CourseClassRow>, "deletedById">) => Promise<CourseClassRow>;
};
