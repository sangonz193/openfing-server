/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import { Pool } from "pg"
import { Connection } from "typeorm"

import { getAllowedEmailRepository } from "./AllowedEmail/AllowedEmail.repository"
import { AllowedEmailRepository } from "./AllowedEmail/AllowedEmail.repository.types"
import { getCourseRepository } from "./Course/Course.repository"
import { CourseRepository } from "./Course/Course.repository.types"
import { getCourseClassRepository } from "./CourseClass/CourseClass.repository"
import { CourseClassRepository } from "./CourseClass/CourseClass.repository.types"
import { getCourseClassChapterCueRepository } from "./CourseClassChapterCue/CourseClassChapterCue.repository"
import { CourseClassChapterCueRepository } from "./CourseClassChapterCue/CourseClassChapterCue.repository.types"
import { getCourseClassListRepository } from "./CourseClassList/CourseClassList.repository"
import { CourseClassListRepository } from "./CourseClassList/CourseClassList.repository.types"
import { getCourseClassLiveStateRepository } from "./CourseClassLiveState/CourseClassLiveState.repository"
import { CourseClassLiveStateRepository } from "./CourseClassLiveState/CourseClassLiveState.repository"
import { getCourseClassVideoRepository } from "./CourseClassVideo/CourseClassVideo.repository"
import { CourseClassVideoRepository } from "./CourseClassVideo/CourseClassVideo.repository.types"
import { getCourseClassVideoFormatRepository } from "./CourseClassVideoFormat/CourseClassVideoFormat.repository"
import { CourseClassVideoFormatRepository } from "./CourseClassVideoFormat/CourseClassVideoFormat.repository.types"
import { getCourseClassVideoQualityRepository } from "./CourseClassVideoQuality/CourseClassVideoQuality.repository"
import { CourseClassVideoQualityRepository } from "./CourseClassVideoQuality/CourseClassVideoQuality.repository.types"
import { getCourseEditionRepository } from "./CourseEdition/CourseEdition.repository"
import { CourseEditionRepository } from "./CourseEdition/CourseEdition.repository.types"
import { getEmailValidationRepository } from "./EmailValidation/EmailValidation.repository"
import { EmailValidationRepository } from "./EmailValidation/EmailValidation.repository"
import { getFaqRepository } from "./Faq/Faq.repository"
import { FaqRepository } from "./Faq/Faq.repository.types"
import { getPostRepository } from "./Post/Post.repository"
import { PostRepository } from "./Post/Post.repository.types"

export type Repositories = {
	allowedEmail: AllowedEmailRepository
	course: CourseRepository
	courseClass: CourseClassRepository
	courseClassChapterCue: CourseClassChapterCueRepository
	courseClassList: CourseClassListRepository
	courseClassLiveState: CourseClassLiveStateRepository
	courseClassVideo: CourseClassVideoRepository
	courseClassVideoFormat: CourseClassVideoFormatRepository
	courseClassVideoQuality: CourseClassVideoQualityRepository
	courseEdition: CourseEditionRepository
	emailValidation: EmailValidationRepository
	faq: FaqRepository
	post: PostRepository
}

export const getRepositories = (connection: Connection, pool: Pool): Repositories => ({
	allowedEmail: getAllowedEmailRepository(connection),
	course: getCourseRepository(connection),
	courseClass: getCourseClassRepository(connection),
	courseClassChapterCue: getCourseClassChapterCueRepository({ pool, connection }),
	courseClassList: getCourseClassListRepository(connection),
	courseClassLiveState: getCourseClassLiveStateRepository(connection),
	courseClassVideo: getCourseClassVideoRepository(connection),
	courseClassVideoFormat: getCourseClassVideoFormatRepository(connection),
	courseClassVideoQuality: getCourseClassVideoQualityRepository(connection),
	courseEdition: getCourseEditionRepository(connection),
	emailValidation: getEmailValidationRepository(pool),
	faq: getFaqRepository(connection),
	post: getPostRepository(connection),
})
