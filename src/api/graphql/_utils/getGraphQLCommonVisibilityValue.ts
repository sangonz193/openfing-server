import { CommonVisibility } from "../../../database/_utils/CommonVisibility"
import { CourseVisibility } from "../schemas.types"

export const getGraphQLCommonVisibilityValue = (value: CommonVisibility): CourseVisibility => {
	const map: Record<CommonVisibility, CourseVisibility> = {
		public: "PUBLIC",
		disabled: "DISABLED",
		hidden: "HIDDEN",
	}

	return map[value]
}
