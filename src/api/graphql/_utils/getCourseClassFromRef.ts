import { RequestContext } from "../../../context/RequestContext"
import { CourseClassRow } from "../../../database/CourseClass/CourseClass.entity.types"
import { CourseClassAccessOptions } from "../../../database/CourseClass/CourseClass.repository.types"
import { CourseClassRef } from "../schemas.types"
import { getCourseClassListFromRef } from "./getCourseClassListFromRef"

export const getCourseClassFromRef = async (
	ref: CourseClassRef,
	options: CourseClassAccessOptions,
	context: RequestContext
): Promise<CourseClassRow | null> => {
	const { dataLoaders } = context

	if (ref.byId) {
		return dataLoaders.courseClass.load({
			...options,
			id: ref.byId.id,
		})
	} else if (ref.byNumber) {
		const courseClassList = await getCourseClassListFromRef(
			ref.byNumber.courseClassList,
			{
				includeDisabled: options.includeDisabled,
				includeHidden: options.includeHidden,
			},
			context
		)

		if (courseClassList) {
			return dataLoaders.courseClass.load({
				...options,
				courseClassListId: courseClassList.id,
				number: ref.byNumber.number,
			})
		}
	}

	return null
}
