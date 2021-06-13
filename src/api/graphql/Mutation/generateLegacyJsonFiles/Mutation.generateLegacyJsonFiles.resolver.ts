import { tryCreateLegacyJsonFiles } from "../../../../modules/miscellaneous/tryCreateLegacyJsonFiles"
import { getGenerateLegacyJsonFilesPayload } from "../../GenerateLegacyJsonFilesPayload/GenerateLegacyJsonFilesPayload.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["generateLegacyJsonFiles"] = async (_, __, { repositories }) => {
	const { modifiedFilesCount } = await tryCreateLegacyJsonFiles({
		courseRepository: repositories.course,
		courseClassRepository: repositories.courseClass,
		courseClassListRepository: repositories.courseClassList,
		courseEditionRepository: repositories.courseEdition,
	})

	return getGenerateLegacyJsonFilesPayload(modifiedFilesCount)
}

export default resolver
