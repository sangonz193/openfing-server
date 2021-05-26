import DataLoader from "dataloader"

import { CourseClassChapterCueRow } from "../database/CourseClassChapterCue/CourseClassChapterCue.entity.types"
import {
	CourseClassChapterCueFindOneOptions,
	CourseClassChapterCueRepository,
} from "../database/CourseClassChapterCue/CourseClassChapterCue.repository.types"

export type CourseClassChapterCueDataLoader = DataLoader<
	CourseClassChapterCueFindOneOptions,
	CourseClassChapterCueRow | null
>

export const getCourseClassChapterCueDataLoader = (
	repo: CourseClassChapterCueRepository
): CourseClassChapterCueDataLoader => {
	return new DataLoader(repo.findBatch)
}
