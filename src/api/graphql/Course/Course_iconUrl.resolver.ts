import { appConfig } from "../../../config/app.config"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["Course"]["iconUrl"] = (parent) => parent.icon_url || appConfig.assets.defaultCourseIcon.url

export default resolver
