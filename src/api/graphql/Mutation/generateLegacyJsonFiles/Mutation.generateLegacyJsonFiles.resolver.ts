import { tryCreateLegacyJsonFiles } from "../../../../legacy-json-files"
import { Resolvers } from "../../schemas.types"
import { getGenerateLegacyJsonFilesPayloadParent } from "./GenerateLegacyJsonFilesPayload.parent"

const resolver: Resolvers["Mutation"]["generateLegacyJsonFiles"] = async (_, __, { repositories }) => {
	const { modifiedFilesCount } = await tryCreateLegacyJsonFiles({
		courseRepository: repositories.course,
		courseClassRepository: repositories.courseClass,
		courseClassListRepository: repositories.courseClassList,
		courseEditionRepository: repositories.courseEdition,
	})

	return getGenerateLegacyJsonFilesPayloadParent(modifiedFilesCount)
}

export default resolver
