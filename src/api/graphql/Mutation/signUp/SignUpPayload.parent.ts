import { UserRow } from "../../../../database/User";
import { SignUpPayload } from "../../schemas.types";
import { getUserParent, UserParent } from "../../User/User.parent";

export type SignUpPayloadParent = Pick<Required<SignUpPayload>, "__typename"> & {
	user: UserParent;
};

export const getSignUpPayloadParent = (user: UserRow): SignUpPayloadParent => ({
	__typename: "SignUpPayload",
	user: getUserParent(user),
});
