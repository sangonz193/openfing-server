import { isValid, parseISO } from "date-fns"
import path from "path"
import SFTP from "ssh2-promise/dist/sftp"
import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { CourseClassVideoRow } from "../../../../database/CourseClassVideo/CourseClassVideo.entity.types"
import { CourseClassVideoFormatRow } from "../../../../database/CourseClassVideoFormat/CourseClassVideoFormat.entity.types"
import { getCourseClassVideoFileName } from "../../../../modules/miscellaneous/getCourseClassVideoFileName"
import { getOpenFingVideoSftpConnection } from "../../../../modules/openfing-video-connection/getOpenFingVideoSftpConnection"
import { getCourseClassFromRef } from "../../_utils/getCourseClassFromRef"
import { getDbCommonVisibilityValue } from "../../_utils/getDbCommonVisibilityValue"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { CourseClassRef, MutationUpdateCourseClassArgs, UpdateCourseClassInput } from "../../schemas.types"
import { getUpdateCourseClassPayload } from "./UpdateCourseClassPayload.parent"

export async function updateCourseClass(
	courseClassRef: CourseClassRef,
	input: UpdateCourseClassInput,
	context: RequestContext & Required<Pick<RequestContext, "user">>
) {
	const { repositories, dataLoaders, user } = context

	const courseClass = await getCourseClassFromRef(
		courseClassRef,
		{
			includeHidden: true,
			includeDisabled: true,
		},
		context
	)
	if (!courseClass) {
		return getNotFoundErrorParent()
	}

	const validatedData = await yup
		.object<
			yup.SchemaOf<{
				[K in keyof MutationUpdateCourseClassArgs["input"]]: Exclude<
					MutationUpdateCourseClassArgs["input"][K],
					null
				>
			}>["fields"]
		>({
			name: yup.string().trim().max(200).notRequired(),
			number: yup.number().moreThan(0).lessThan(1000).notRequired(),
			visibility: yup.mixed().nullable(),
			publishedAt: yup
				.date()
				.transform((value): Date | undefined => {
					if (value instanceof Date) {
						return value
					}
					if (typeof value === "string") {
						return parseISO(value)
					}
					return undefined
				})
				.nullable(false)
				.notRequired(),
		})
		.required()
		.validate(input)

	if (validatedData.publishedAt) {
		validatedData.publishedAt.setUTCHours(
			(courseClass.published_at ?? validatedData.publishedAt).getUTCHours(),
			(courseClass.published_at ?? validatedData.publishedAt).getUTCMinutes(),
			(courseClass.published_at ?? validatedData.publishedAt).getUTCSeconds(),
			(courseClass.published_at ?? validatedData.publishedAt).getUTCMilliseconds()
		)

		if (!isValid(validatedData.publishedAt)) {
			return getGenericErrorParent()
		}
	}

	if (typeof validatedData.number === "number" && courseClass.course_class_list_id !== null) {
		const courseClassWithSameNumber = await dataLoaders.courseClass.load({
			courseClassListId: courseClass.course_class_list_id,
			number: validatedData.number,
			includeDisabled: true,
			includeHidden: true,
		})

		if (courseClassWithSameNumber) {
			return getGenericErrorParent()
		}
	}

	const updatedCourseClass = await repositories.courseClass.update(courseClass.id, {
		updated_by_id: user.sub,
		name: validatedData.name,
		number: validatedData.number,
		visibility: validatedData.visibility && getDbCommonVisibilityValue(validatedData.visibility),
		published_at: validatedData.publishedAt,
	})

	const openFingVideoServerUrl = "https://openfing-video.fing.edu.uy"

	const renameVideoFile = async (options: {
		from: string
		to: string
		courseClassVideoFormatId: CourseClassVideoFormatRow["id"]
		sftp: SFTP
	}) => {
		await Promise.all([
			await repositories.courseClassVideoFormat.update(options.courseClassVideoFormatId, {
				url: openFingVideoServerUrl + options.to,
				updated_by_id: user.sub,
			}),
			options.sftp.rename(options.from, options.to),
		])

		const torrentFromPath = `${options.from}.torrent`
		const torrentToPath = `${options.to}.torrent`
		await options.sftp.rename(torrentFromPath, torrentToPath).catch(() => null)
	}

	const getVideosData = async () => {
		const getQualities = async (id: CourseClassVideoRow["id"]) => {
			return Promise.all(
				(
					await repositories.courseClassVideoQuality.findAll({
						courseClassVideoId: id,
					})
				).map(async (quality) => {
					return {
						...quality,
						formats: await repositories.courseClassVideoFormat.findAll({
							courseClassVideoQualityId: quality.id,
						}),
					}
				})
			)
		}

		return await Promise.all(
			(
				await repositories.courseClassVideo.findAll({
					courseClassId: courseClass.id,
					includeDisabled: true,
					includeHidden: true,
				})
			).map(async (video) => {
				return {
					...video,
					qualities: await getQualities(video.id),
				}
			})
		)
	}

	const getCourseClassListCode = async () => {
		const { course_class_list_id } = updatedCourseClass
		if (!course_class_list_id) {
			return null
		}

		return (
			await dataLoaders.courseClassList.load({
				id: course_class_list_id,
				includeDisabled: true,
				includeHidden: true,
			})
		)?.code
	}

	const [videos, openFingVideoSftp, courseClassListCode] = await Promise.all([
		getVideosData(),
		getOpenFingVideoSftpConnection(),
		getCourseClassListCode(),
	])

	if (openFingVideoSftp && courseClassListCode) {
		await Promise.all(
			videos.map(async (video, videoIndex) => {
				await Promise.all(
					video.qualities.map(async (quality, qualityIndex) => {
						await Promise.all(
							quality.formats.map(async (format) => {
								const videoFilePath = format.url?.split(openFingVideoServerUrl.substr(-10))[1]
								if (!videoFilePath) {
									return
								}

								const fileExists = !!(await openFingVideoSftp?.lstat(videoFilePath).catch(() => false))
								if (!fileExists) {
									console.log(`Won't rename: File does not exist: ${videoFilePath}`)
									return
								}

								const newVideoFileName = await getCourseClassVideoFileName({
									courseClass: updatedCourseClass,
									courseClassListCode,
									format,
									quality,
									video,
									qualityIndex,
									videoIndex,
								})

								if (!newVideoFileName) {
									console.log(`Could not get new name for courseClass ${courseClass.id}`)
									return
								}

								const newVideoFilePath = path.posix.resolve(videoFilePath, "..", newVideoFileName)

								if (newVideoFilePath !== videoFilePath) {
									await renameVideoFile({
										from: videoFilePath,
										to: newVideoFilePath,
										courseClassVideoFormatId: format.id,
										sftp: openFingVideoSftp,
									})
								}
							})
						)
					})
				)
			})
		)
	}

	return getUpdateCourseClassPayload({
		courseClass: updatedCourseClass,
	})
}
