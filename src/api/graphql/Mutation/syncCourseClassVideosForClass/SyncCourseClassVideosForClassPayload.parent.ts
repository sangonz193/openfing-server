import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { CourseClassParent } from "../../CourseClass/CourseClass.parent"
import { SyncCourseClassVideosForClassPayload } from "../../schemas.types"

export type SyncCourseClassVideosForClassPayloadParent = SafeOmit<
	Required<SyncCourseClassVideosForClassPayload>,
	"courseClass"
> & {
	courseClass: CourseClassParent
}

export type SyncCourseClassVideosForClassPayloadData = SafeOmit<
	SyncCourseClassVideosForClassPayloadParent,
	"__typename"
>

export function getSyncCourseClassVideosForClassPayloadParent(
	data: SyncCourseClassVideosForClassPayloadData
): SyncCourseClassVideosForClassPayloadParent {
	return {
		__typename: "SyncCourseClassVideosForClassPayload",
		...data,
	}
}
