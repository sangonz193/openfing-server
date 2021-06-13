import { RequestContext } from "../../context/RequestContext"

export type RestEndpoint = {
	httpMethod: "get"
	handler: (context: RequestContext) => void
}
