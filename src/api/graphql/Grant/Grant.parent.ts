import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { Grant } from "../schemas.types"

export type GrantParent = Grant

export const getGrantParent = (data: SafeOmit<Grant, "__typename">): GrantParent => ({
	__typename: "Grant",
	...data,
})
