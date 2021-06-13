import { InvalidEmailDomain } from "../schemas.types"

export type InvalidEmailDomainParent = InvalidEmailDomain

export const getInvalidEmailDomainParent = (): InvalidEmailDomainParent => ({
	__typename: "InvalidEmailDomain",
	_: null,
})
