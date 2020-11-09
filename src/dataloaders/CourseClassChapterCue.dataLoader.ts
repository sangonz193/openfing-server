import DataLoader from "dataloader";

import { CourseClassChapterCueRow } from "../entities/CourseClassChapterCue/CourseClassChapterCue.entity.types";
import {
	CourseClassChapterCueFindOneOptions,
	CourseClassChapterCueRepository,
} from "../repositories/CourseClassChapterCue/CourseClassChapterCue.repository.types";

export type CourseClassChapterCueDataLoader = DataLoader<
	CourseClassChapterCueFindOneOptions,
	CourseClassChapterCueRow | null
>;

export const getCourseClassChapterCueDataLoader = (
	repo: CourseClassChapterCueRepository
): CourseClassChapterCueDataLoader => {
	return new DataLoader(repo.findBatch);
};
