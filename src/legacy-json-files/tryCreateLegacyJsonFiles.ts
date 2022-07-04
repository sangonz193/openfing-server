import { arrayMapLimit } from "@sangonz193/utils/arrayMapLimit"
import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import path from "path"

import { CourseRow } from "../database/Course/Course.entity.types"
import { CourseRepository } from "../database/Course/Course.repository.types"
import { CourseClassRepository } from "../database/CourseClass/CourseClass.repository.types"
import { CourseClassListRow } from "../database/CourseClassList/CourseClassList.entity.types"
import { CourseClassListRepository } from "../database/CourseClassList/CourseClassList.repository.types"
import { CourseEditionRow } from "../database/CourseEdition/CourseEdition.entity.types"
import { CourseEditionRepository } from "../database/CourseEdition/CourseEdition.repository.types"
import { createLegacyJsonFilesConfig } from "./createLegacyJsonFiles.config"

export type CreateLegacyJsonFilesOptions = {
	courseRepository: CourseRepository
	courseEditionRepository: CourseEditionRepository
	courseClassRepository: CourseClassRepository
	courseClassListRepository: CourseClassListRepository
}

type LegacyCourse = {
	code: string
	name: string
	eva: string
}

type LegacyCourseDetail = {
	code: string
	name: string
	eva: string
	classes: Record<string, string>
}

export async function tryCreateLegacyJsonFiles(
	options: CreateLegacyJsonFilesOptions
): Promise<{ modifiedFilesCount: number }> {
	const { courseEditionRepository, courseRepository } = options
	if (!createLegacyJsonFilesConfig.enable) {
		return { modifiedFilesCount: 0 }
	}

	const { dataFolderPath } = createLegacyJsonFilesConfig
	const courses = await courseRepository.findAll({
		includeDisabled: true,
		includeHidden: true,
	})

	const legacyCourses: LegacyCourse[] = []
	const detailLegacyCourses: LegacyCourseDetail[] = []

	await arrayMapLimit(
		courses,
		async (course) => {
			const courseEditions = await courseEditionRepository.findAll({
				includeDisabled: false,
				includeHidden: true,
				courseId: course.id,
			})

			await arrayMapLimit(
				courseEditions,
				async (courseEdition) => {
					const courseEditionMap = await handleCourseEdition(courseEdition, {
						...options,
						course,
					})
					courseEditionMap.forEach((courseEditionMapValue) => {
						if (courseEditionMapValue.course) {
							legacyCourses.push(courseEditionMapValue.course)
						}

						detailLegacyCourses.push(courseEditionMapValue.courseDetail)
					})
				},
				2
			)
		},
		2
	)

	const coursesJsonFilePath = path.resolve(dataFolderPath, "courses.json")
	const coursesJsonData = {
		courses: legacyCourses,
	}

	let modifiedFilesCount = 0

	async function compareAndWriteFile(filePath: string, content: object) {
		const stringContent = JSON.stringify(content, undefined, 2)
		const writeFile = async () => {
			await fs.writeFile(filePath, stringContent)
			modifiedFilesCount++
		}

		if (await fsExists(filePath)) {
			if ((await fs.readFile(filePath, "utf8")) !== stringContent) {
				await writeFile()
			}
		} else {
			await writeFile()
		}
	}

	await Promise.all([
		compareAndWriteFile(coursesJsonFilePath, coursesJsonData),
		arrayMapLimit(
			detailLegacyCourses,
			async (detailedCourse) => {
				await compareAndWriteFile(
					path.resolve(coursesJsonFilePath, "..", `${detailedCourse.code}.json`),
					detailedCourse
				)
			},
			2
		),
	])

	return { modifiedFilesCount }
}

async function handleMapCourseClassList(
	courseClassList: CourseClassListRow,
	options: CreateLegacyJsonFilesOptions & {
		course: CourseRow
		courseEdition: CourseEditionRow
	}
): Promise<{ course: LegacyCourse | undefined; courseDetail: LegacyCourseDetail }> {
	const { course, courseEdition, courseClassRepository } = options

	const legacyCourseName = `${course.name ?? ""} ${courseClassList.name ?? ""}`.trim()

	let legacyCurse: LegacyCourse | undefined

	if (
		course.visibility !== "disabled" &&
		course.visibility !== "hidden" &&
		courseEdition.visibility !== "disabled" &&
		courseEdition.visibility !== "hidden" &&
		courseClassList.visibility !== "disabled" &&
		courseClassList.visibility !== "hidden"
	) {
		legacyCurse = {
			code: courseClassList.code ?? "",
			eva: course.eva ?? "",
			name: legacyCourseName,
		}
	}

	const legacyCourseDetail: LegacyCourseDetail = {
		name: legacyCourseName,
		eva: course.eva ?? "",
		code: courseClassList.code ?? "",
		classes: {},
	}

	const courseClasses = await courseClassRepository.findAll({
		includeDisabled: false,
		includeHidden: true,
		courseClassListId: courseClassList.id,
	})

	courseClasses.forEach((courseClass) => {
		if (typeof courseClass.number === "number") {
			legacyCourseDetail.classes[courseClass.number.toString()] = courseClass.name ?? ""
		}
	})

	return {
		course: legacyCurse,
		courseDetail: legacyCourseDetail,
	}
}

async function handleCourseEdition(
	courseEdition: CourseEditionRow,
	options: CreateLegacyJsonFilesOptions & {
		course: CourseRow
	}
): Promise<Array<{ course: LegacyCourse | undefined; courseDetail: LegacyCourseDetail }>> {
	const { courseClassListRepository, course, courseClassRepository, courseRepository, courseEditionRepository } =
		options

	const courseClassLists = await courseClassListRepository.findAll({
		includeDisabled: false,
		includeHidden: true,
		courseEditionId: courseEdition.id,
	})

	return arrayMapLimit(
		courseClassLists,
		async (courseClassList) => {
			return handleMapCourseClassList(courseClassList, {
				course,
				courseClassListRepository,
				courseClassRepository,
				courseRepository,
				courseEditionRepository,
				courseEdition,
			})
		},
		2
	)
}
