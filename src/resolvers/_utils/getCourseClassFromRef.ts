import { Context } from "../../Context";
import { CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import { CourseClassRef } from "../../generated/graphql.types";
import { CourseClassAccessOptions } from "../../repositories/CourseClass/CourseClass.repository.types";
import { getCourseClassListFromRef } from "./getCourseClassListFromRef";

export const getCourseClassFromRef = async (
	ref: CourseClassRef,
	options: CourseClassAccessOptions,
	context: Context
): Promise<CourseClassRow | null> => {
	const { dataLoaders } = context;

	if (ref.byId) {
		const numberId = Number(ref.byId.id);

		if (numberId)
			return dataLoaders.courseClass.load({
				...options,
				id: numberId,
			});
	} else if (ref.byNumber) {
		const courseClassList = await getCourseClassListFromRef(
			ref.byNumber.courseClassList,
			{
				includeDisabled: options.includeDisabled,
				includeHidden: options.includeHidden,
			},
			context
		);

		if (courseClassList)
			return dataLoaders.courseClass.load({
				...options,
				courseClassListId: courseClassList.id,
				number: ref.byNumber.number,
			});
	}

	return null;
};
