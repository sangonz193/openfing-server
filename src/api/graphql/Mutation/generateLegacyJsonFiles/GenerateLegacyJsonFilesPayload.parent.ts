import { GenerateLegacyJsonFilesPayload } from "../../schemas.types"

export type GenerateLegacyJsonFilesPayloadParent = Pick<
	Required<GenerateLegacyJsonFilesPayload>,
	"__typename" | "modifiedFilesCount"
>

export const getGenerateLegacyJsonFilesPayloadParent = (
	modifiedFilesCount: number
): GenerateLegacyJsonFilesPayloadParent => ({
	__typename: "GenerateLegacyJsonFilesPayload",
	modifiedFilesCount: modifiedFilesCount,
})
