import { Context } from "../../Context";
import { CourseClassListRow } from "../../entities/CourseClassList/CourseClassList.entity.types";
import { CourseClassListRef } from "../../generated/graphql.types";
import { CourseClassListAccessOptions } from "../../repositories/CourseClassList/CourseClassList.repository.types";

export const getCourseClassListFromRef = async (
	ref: CourseClassListRef,
	options: CourseClassListAccessOptions,
	context: Context
): Promise<CourseClassListRow | null> => {
	const { dataLoaders } = context;

	if (ref.byId)
		return dataLoaders.courseClassList.load({
			...options,
			id: ref.byId.id,
		});
	else if (ref.byCode)
		return dataLoaders.courseClassList.load({
			...options,
			code: ref.byCode.code,
		});

	return null;
};
