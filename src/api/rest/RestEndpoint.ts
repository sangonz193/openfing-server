import { RequestContext } from "../RequestContext";

export type RestEndpoint = {
	httpMethod: "get";
	handler: (context: RequestContext) => void;
};
