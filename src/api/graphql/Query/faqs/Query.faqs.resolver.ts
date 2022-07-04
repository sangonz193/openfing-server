import { getFaqParent } from "../../Faq/Faq.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["faqs"] = async (_, __, { repositories }) =>
	(await repositories.faq.findAll()).map(getFaqParent)

export default resolver
