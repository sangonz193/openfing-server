import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import { ContextFunction } from "apollo-server-core"
import { ExpressContext } from "apollo-server-express"
import type express from "express"

import { getRequestContext } from "../../context/getRequestContext"
import { RequestContext } from "../../context/RequestContext"
import { endpointsMap } from "./endpoints"

export const registerRestEndpoints = (expressApp: express.Application) => {
	const context: ContextFunction<ExpressContext, RequestContext> = async ({ req, res }) => {
		return getRequestContext(req, res)
	}

	dangerousKeysOf(endpointsMap).forEach((endpointUrl) => {
		const endpoint = endpointsMap[endpointUrl]

		expressApp[endpoint.httpMethod](`/rest/${endpointUrl}`, async (req, res) => {
			return endpoint.handler(await context({ req, res }))
		})
	})
}
