import DataLoader from "dataloader";

import { CourseClassListRow } from "../entities/CourseClassList/CourseClassList.entity.types";
import {
	CourseClassListFindOneOptions,
	CourseClassListRepository,
} from "../repositories/CourseClassList/CourseClassList.repository.types";

export type CourseClassListDataLoader = DataLoader<CourseClassListFindOneOptions, CourseClassListRow | null>;

export const getCourseClassListDataLoader = (repo: CourseClassListRepository): CourseClassListDataLoader => {
	return new DataLoader(repo.findBatch);
};
