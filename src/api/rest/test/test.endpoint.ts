import { getUuid } from "@sangonz193/utils/getUuid"

import { RestEndpoint } from "../RestEndpoint"

export const testUuid = getUuid()

const handler: RestEndpoint["handler"] = (context) => {
	context.res.send(testUuid)
}

const endpoint: RestEndpoint = {
	httpMethod: "get",
	handler,
}

export default endpoint
