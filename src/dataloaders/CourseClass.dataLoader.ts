import DataLoader from "dataloader"

import { CourseClassRow } from "../database/CourseClass/CourseClass.entity.types"
import { CourseClassFindOneOptions, CourseClassRepository } from "../database/CourseClass/CourseClass.repository.types"

export type CourseClassDataLoader = DataLoader<CourseClassFindOneOptions, CourseClassRow | null>

export const getCourseClassDataLoader = (repo: CourseClassRepository): CourseClassDataLoader => {
	return new DataLoader(repo.findBatch)
}
