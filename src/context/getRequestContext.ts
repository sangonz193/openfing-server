import { ExpressContext } from "apollo-server-express"

import { getDataLoaders } from "../dataloaders"
import { getSharedContext, SharedContext } from "./getSharedContex"
import { RequestContext } from "./RequestContext"

let sharedContextPromise: Promise<SharedContext> | undefined

export async function getRequestContext(context: ExpressContext): Promise<RequestContext> {
	if (!sharedContextPromise) {
		sharedContextPromise = getSharedContext().catch((error) => {
			sharedContextPromise = undefined
			throw error
		})
	}

	const sharedContext = await sharedContextPromise

	return {
		...sharedContext,
		get dataLoaders() {
			return getDataLoaders(sharedContext.repositories, sharedContext.ormConnection, sharedContext.pool)
		},
		req: context.req,
		res: context.res,
	}
}
