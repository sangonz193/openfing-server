import { InvalidEmailDomainError } from "../schemas.types"

export type InvalidEmailDomainErrorParent = InvalidEmailDomainError

export const getInvalidEmailDomainErrorParent = (): InvalidEmailDomainErrorParent => ({
	__typename: "InvalidEmailDomainError",
	_: null,
})
