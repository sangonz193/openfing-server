import { UserRow } from "../../../../database/User"
import { UserFromSecretPayload } from "../../schemas.types"
import { getUserParent, UserParent } from "../../User/User.parent"

export type UserFromSecretPayloadParent = Pick<Required<UserFromSecretPayload>, "__typename"> & {
	user: UserParent
}

export const getUserFromSecretPayload = (user: UserRow): UserFromSecretPayloadParent => ({
	__typename: "UserFromSecretPayload",
	user: getUserParent(user),
})
