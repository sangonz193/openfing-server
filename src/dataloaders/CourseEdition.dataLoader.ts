import DataLoader from "dataloader"

import { CourseEditionRow } from "../database/CourseEdition/CourseEdition.entity.types"
import {
	CourseEditionFindOneOptions,
	CourseEditionRepository,
} from "../database/CourseEdition/CourseEdition.repository.types"

export type CourseEditionDataLoader = DataLoader<CourseEditionFindOneOptions, CourseEditionRow | null>

export const getCourseEditionDataLoader = (repo: CourseEditionRepository): CourseEditionDataLoader => {
	return new DataLoader(repo.findBatch)
}
