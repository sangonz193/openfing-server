import { MaxLengthError } from "../schemas.types"

export type MaxLengthErrorParent = MaxLengthError

export const getMaxLengthErrorParent = (max: number): MaxLengthErrorParent => ({
	__typename: "MaxLengthError",
	max,
})
