import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { getUserFromSecret } from "../../../authentication/getUserFromSecret"
import { RequestContext } from "../../../context/RequestContext"
import {
	AuthenticationErrorParent,
	getAuthenticationErrorParent,
} from "../AuthenticationError/AuthenticationError.parent"
import { ResolverFn } from "../schemas.types"

export function withUserFromSecret<TReturn, TParent, TContext extends RequestContext, TArgs extends { secret: string }>(
	resolver: ResolverFn<TReturn, TParent, SafeOmit<TContext, "user"> & Required<Pick<RequestContext, "user">>, TArgs>
): ResolverFn<TReturn | AuthenticationErrorParent, TParent, TContext, TArgs> {
	return async (parent, args, context, info) => {
		const user = await getUserFromSecret(args.secret, context)

		if (user) {
			return resolver(parent, args, { ...context, user }, info)
		}

		return getAuthenticationErrorParent()
	}
}
