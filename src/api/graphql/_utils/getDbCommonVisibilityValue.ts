import { CommonVisibility } from "../../../database/_utils/CommonVisibility"

export const getDbCommonVisibilityValue = (value: "PUBLIC" | "HIDDEN" | "DISABLED"): CommonVisibility => {
	const map: Record<typeof value, CommonVisibility> = {
		PUBLIC: "public",
		DISABLED: "disabled",
		HIDDEN: "hidden",
	}

	return map[value]
}
