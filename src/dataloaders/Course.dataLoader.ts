import DataLoader from "dataloader";

import { CourseRow } from "../entities/Course/Course.entity.types";
import { CourseFindOneOptions, CourseRepository } from "../repositories/Course/Course.repository.types";

export type CourseDataLoader = DataLoader<CourseFindOneOptions, CourseRow | null>;

export const getCourseDataLoader = (repo: CourseRepository): CourseDataLoader => {
	return new DataLoader(repo.findBatch);
};
