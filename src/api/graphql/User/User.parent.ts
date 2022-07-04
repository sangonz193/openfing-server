import { UserInfo } from "../../../authentication/keycloak/UserInfo"
import { User } from "../schemas.types"

export type UserParent = Required<User>

export const getUserParent = (userInfo: UserInfo): UserParent => ({
	__typename: "User",
	id: userInfo.sub,
	name: userInfo.name,
	givenName: userInfo.given_name,
	familyName: userInfo.family_name ?? null,
})
