import DataLoader from "dataloader"

import { CourseClassVideoFormatRow } from "../database/CourseClassVideoFormat/CourseClassVideoFormat.entity.types"
import {
	CourseClassVideoFormatFindOneOptions,
	CourseClassVideoFormatRepository,
} from "../database/CourseClassVideoFormat/CourseClassVideoFormat.repository.types"

export type CourseClassVideoFormatDataLoader = DataLoader<
	CourseClassVideoFormatFindOneOptions,
	CourseClassVideoFormatRow | null
>

export const getCourseClassVideoFormatDataLoader = (
	repo: CourseClassVideoFormatRepository
): CourseClassVideoFormatDataLoader => {
	return new DataLoader(repo.findBatch)
}
