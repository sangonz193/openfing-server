import { RequestContext } from "../../../context/RequestContext"
import { CourseClassListRow } from "../../../database/CourseClassList/CourseClassList.entity.types"
import { CourseClassListAccessOptions } from "../../../database/CourseClassList/CourseClassList.repository.types"
import { CourseClassListRef } from "../schemas.types"

export const getCourseClassListFromRef = async (
	ref: CourseClassListRef,
	options: CourseClassListAccessOptions,
	context: RequestContext
): Promise<CourseClassListRow | null> => {
	const { dataLoaders } = context

	if (ref.byId) {
		return dataLoaders.courseClassList.load({
			...options,
			id: ref.byId.id,
		})
	} else if (ref.byCode) {
		return dataLoaders.courseClassList.load({
			...options,
			code: ref.byCode.code,
		})
	}

	return null
}
