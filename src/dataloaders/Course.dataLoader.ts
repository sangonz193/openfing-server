import DataLoader from "dataloader"

import { CourseRow } from "../database/Course/Course.entity.types"
import { CourseFindOneOptions, CourseRepository } from "../database/Course/Course.repository.types"

export type CourseDataLoader = DataLoader<CourseFindOneOptions, CourseRow | null>

export const getCourseDataLoader = (repo: CourseRepository): CourseDataLoader => {
	return new DataLoader(repo.findBatch)
}
