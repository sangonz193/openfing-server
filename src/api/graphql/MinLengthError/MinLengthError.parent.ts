import { MinLengthError } from "../schemas.types"

export type MinLengthErrorParent = MinLengthError

export const getMinLengthErrorParent = (min: number): MinLengthErrorParent => ({
	__typename: "MinLengthError",
	min,
})
