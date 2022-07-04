import DataLoader from "dataloader"

import { CourseClassVideoQualityRow } from "../database/CourseClassVideoQuality/CourseClassVideoQuality.entity.types"
import {
	CourseClassVideoQualityFindOneOptions,
	CourseClassVideoQualityRepository,
} from "../database/CourseClassVideoQuality/CourseClassVideoQuality.repository.types"

export type CourseClassVideoQualityDataLoader = DataLoader<
	CourseClassVideoQualityFindOneOptions,
	CourseClassVideoQualityRow | null
>

export const getCourseClassVideoQualityDataLoader = (
	repo: CourseClassVideoQualityRepository
): CourseClassVideoQualityDataLoader => {
	return new DataLoader(repo.findBatch)
}
