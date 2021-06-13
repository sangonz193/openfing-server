import { videoUrlHasTorrent } from "../../../modules/video-download/videoUrlHasTorrent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideoFormat"]["hasTorrent"] = async (parent) =>
	!!parent.url && (await videoUrlHasTorrent(parent.url))

export default resolver
