import { hasTorrent } from "../_utils/hasTorrent";
import { Resolvers } from "../schemas.types";

const resolver: Resolvers["CourseClassVideoFormat"]["hasTorrent"] = async (parent) =>
	!!parent.url && (await hasTorrent({ url: parent.url }));

export default resolver;
