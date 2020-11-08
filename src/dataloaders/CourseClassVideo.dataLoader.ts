import DataLoader from "dataloader";

import { CourseClassVideoRow } from "../entities/CourseClassVideo/CourseClassVideo.entity.types";
import {
	CourseClassVideoFindOneOptions,
	CourseClassVideoRepository,
} from "../repositories/CourseClassVideo/CourseClassVideo.repository.types";

export type CourseClassVideoDataLoader = DataLoader<CourseClassVideoFindOneOptions, CourseClassVideoRow | null>;

export const getCourseClassVideoDataLoader = (repo: CourseClassVideoRepository): CourseClassVideoDataLoader => {
	return new DataLoader(repo.findBatch);
};
