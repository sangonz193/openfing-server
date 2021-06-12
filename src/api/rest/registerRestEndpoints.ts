import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import type express from "express"

import { getRequestContext } from "../../context/getRequestContext"
import { endpointsMap } from "./endpoints"

export const registerRestEndpoints = (expressApp: express.Application) => {
	dangerousKeysOf(endpointsMap).forEach((endpointUrl) => {
		const endpoint = endpointsMap[endpointUrl]

		expressApp[endpoint.httpMethod](`/rest/${endpointUrl}`, async (req, res) => {
			try {
				return await Promise.resolve(endpoint.handler(await getRequestContext({ req, res })))
			} catch (error: unknown) {
				console.log(error)
				return res.sendStatus(500)
			}
		})
	})
}
