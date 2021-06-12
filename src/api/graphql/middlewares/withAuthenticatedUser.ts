import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { RequestContext } from "../../../context/RequestContext"
import {
	AuthenticationErrorParent,
	getAuthenticationErrorParent,
} from "../AuthenticationError/AuthenticationError.parent"
import { ResolverFn } from "../schemas.types"

export function withUserFromSecret<TReturn, TParent, TContext extends RequestContext, TArgs>(
	resolver: ResolverFn<TReturn, TParent, SafeOmit<TContext, "user"> & Required<Pick<RequestContext, "user">>, TArgs>
): ResolverFn<TReturn | AuthenticationErrorParent, TParent, TContext, TArgs> {
	return async (parent, args, context, info) => {
		const token = context.req.headers.authorization?.split("Bearer ")[0]

		if (token) {
			const userInfo = await context.keycloakConnect.grantManager.userInfo(token).catch((error) => {
				console.log(error)
				return null
			})

			if (userInfo) {
				return resolver(parent, args, { ...context, user: userInfo as any }, info)
			}
		}

		return getAuthenticationErrorParent()
	}
}
