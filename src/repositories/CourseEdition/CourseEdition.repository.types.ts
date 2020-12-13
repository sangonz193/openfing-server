import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import { CourseRow } from "../../entities/Course/Course.entity.types";
import { CourseEditionEntitySchema, CourseEditionRow } from "../../entities/CourseEdition/CourseEdition.entity.types";

export type CourseEditionAccessOptions = {
	includeHidden?: boolean;
	includeDisabled?: boolean;
};

export type CourseEditionFindOneOptions = CourseEditionAccessOptions & {
	id: CourseEditionRow["id"];
};

export type CourseEditionFindAllOptions = CourseEditionAccessOptions & {
	courseId: CourseRow["id"];
};

export type SaveCourseEditionData = SafeOmit<CourseEditionRow, "id">;

export type CreateCourseEditionData = SafeOmit<
	CourseEditionRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<
		Pick<CourseEditionRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">
	>;

export type CourseEditionRepository = {
	_typedRepository: TypedRepository<CourseEditionEntitySchema>;

	findAll: (options: CourseEditionFindAllOptions) => Promise<CourseEditionRow[]>;
	findBatch: (options: readonly CourseEditionFindOneOptions[]) => Promise<Array<CourseEditionRow | null>>;

	is: (courseEdition: CourseEditionRow, findOptions: CourseEditionFindOneOptions) => boolean;

	create: (data: CreateCourseEditionData) => SaveCourseEditionData;
	save: (data: SaveCourseEditionData) => Promise<CourseEditionRow>;
};
