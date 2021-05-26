import DataLoader from "dataloader"

import { CourseClassListRow } from "../database/CourseClassList/CourseClassList.entity.types"
import {
	CourseClassListFindOneOptions,
	CourseClassListRepository,
} from "../database/CourseClassList/CourseClassList.repository.types"

export type CourseClassListDataLoader = DataLoader<CourseClassListFindOneOptions, CourseClassListRow | null>

export const getCourseClassListDataLoader = (repo: CourseClassListRepository): CourseClassListDataLoader => {
	return new DataLoader(repo.findBatch)
}
