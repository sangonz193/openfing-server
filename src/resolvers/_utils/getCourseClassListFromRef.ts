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

	if (ref.byId) {
		const numberId = Number(ref.byId.id);

		if (numberId)
			return dataLoaders.courseClassList.findOne({
				...options,
				id: numberId,
			});
	} else if (ref.byCode)
		return dataLoaders.courseClassList.findOne({
			...options,
			code: ref.byCode.code,
		});

	return null;
};
