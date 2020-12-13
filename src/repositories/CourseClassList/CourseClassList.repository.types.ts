import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import {
	CourseClassListEntitySchema,
	CourseClassListRow,
} from "../../entities/CourseClassList/CourseClassList.entity.types";

export type CourseClassListRef =
	| {
			id: CourseClassListRow["id"];
	  }
	| {
			code: Exclude<CourseClassListRow["code"], null>;
	  };

export type CourseClassListAccessOptions = {
	includeHidden?: boolean;
	includeDisabled?: boolean;
};

export type CourseClassListFindOneOptions = CourseClassListAccessOptions & CourseClassListRef;

export type CourseClassListFindAllOptions = CourseClassListAccessOptions & {
	courseEditionId: CourseClassListRow["course_edition_id"];
};

export type SaveCourseClassListData = SafeOmit<CourseClassListRow, "id">;

export type CreateCourseClassListData = SafeOmit<
	CourseClassListRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<
		Pick<CourseClassListRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">
	>;

export type CourseClassListRepository = {
	_typedRepository: TypedRepository<CourseClassListEntitySchema>;

	findOne: (options: CourseClassListFindOneOptions) => Promise<CourseClassListRow | null>;
	findAll: (options: CourseClassListFindAllOptions) => Promise<CourseClassListRow[]>;
	findBatch: (options: readonly CourseClassListFindOneOptions[]) => Promise<Array<CourseClassListRow | null>>;

	is: (courseClassList: CourseClassListRow, findOptions: CourseClassListFindOneOptions) => boolean;

	create: (data: CreateCourseClassListData) => SaveCourseClassListData;
	insert: (data: SaveCourseClassListData) => Promise<CourseClassListRow>;
	createAndInsert: (data: CreateCourseClassListData) => Promise<CourseClassListRow>;

	update: (
		id: CourseClassListRow["id"],
		newValues: Partial<SafeOmit<CourseClassListRow, "id">>
	) => Promise<CourseClassListRow>;

	delete: (
		id: CourseClassListRow["id"],
		data: Pick<Required<CourseClassListRow>, "deleted_by_id">
	) => Promise<CourseClassListRow>;
};
