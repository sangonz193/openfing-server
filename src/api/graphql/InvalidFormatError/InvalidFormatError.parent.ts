import { InvalidFormatError } from "../schemas.types"

export type InvalidFormatErrorParent = InvalidFormatError

export const getInvalidFormatErrorParent = (): InvalidFormatErrorParent => ({
	__typename: "InvalidFormatError",
	_: null,
})
