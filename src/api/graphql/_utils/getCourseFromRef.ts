import { RequestContext } from "../../../context/RequestContext"
import { CourseRow } from "../../../database/Course/Course.entity.types"
import { CourseAccessOptions } from "../../../database/Course/Course.repository.types"
import { CourseRef } from "../schemas.types"

export const getCourseFromRef = async (
	ref: CourseRef,
	options: CourseAccessOptions,
	context: RequestContext
): Promise<CourseRow | null> => {
	const { dataLoaders } = context

	if (ref.byId) {
		return dataLoaders.course.load({
			...options,
			id: ref.byId.id,
		})
	}

	if (ref.byCode) {
		return dataLoaders.course.load({
			...options,
			code: ref.byCode.code,
		})
	}

	return null
}
