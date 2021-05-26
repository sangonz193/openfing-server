import DataLoader from "dataloader"

import { CourseClassVideoRow } from "../database/CourseClassVideo/CourseClassVideo.entity.types"
import {
	CourseClassVideoFindOneOptions,
	CourseClassVideoRepository,
} from "../database/CourseClassVideo/CourseClassVideo.repository.types"

export type CourseClassVideoDataLoader = DataLoader<CourseClassVideoFindOneOptions, CourseClassVideoRow | null>

export const getCourseClassVideoDataLoader = (repo: CourseClassVideoRepository): CourseClassVideoDataLoader => {
	return new DataLoader(repo.findBatch)
}
