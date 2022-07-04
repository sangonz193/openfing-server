import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { RequestContext } from "../../../context/RequestContext"
import { getUserFromContext } from "../../_utils/getUserFromContext"
import {
	AuthenticationErrorParent,
	getAuthenticationErrorParent,
} from "../AuthenticationError/AuthenticationError.parent"
import { ResolverFn } from "../schemas.types"

export function withAuthenticatedUser<TReturn, TParent, TContext extends RequestContext, TArgs>(
	resolver: ResolverFn<TReturn, TParent, SafeOmit<TContext, "user"> & Required<Pick<RequestContext, "user">>, TArgs>
): ResolverFn<TReturn | AuthenticationErrorParent, TParent, TContext, TArgs> {
	return async (parent, args, context, info) => {
		const user = await getUserFromContext(context)

		if (!user || !user.email_verified) {
			return getAuthenticationErrorParent()
		}

		return resolver(
			parent,
			args,
			{
				...context,
				user: user as any,
			},
			info
		)
	}
}
