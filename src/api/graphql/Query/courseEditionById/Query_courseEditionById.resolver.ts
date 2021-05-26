import { getCourseEditionParent } from "../../CourseEdition/CourseEdition.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["courseEditionById"] = async (_, args, { dataLoaders }) => {
	const { id } = args

	const courseEdition = await dataLoaders.courseEdition.load({ id })

	return courseEdition ? getCourseEditionParent(courseEdition) : getNotFoundErrorParent()
}

export default resolver
