import "core-js/stable";
import "reflect-metadata";
import "regenerator-runtime/runtime";
import "../_utils/configEnv";

import axios, { AxiosError } from "axios";
import csvStringify from "csv-stringify";
import fs from "fs";
import https from "https";
import moment from "moment";
import path from "path";
import { Pool } from "pg";
import { from as copyFrom } from "pg-copy-streams";
import { createConnection } from "typeorm";
import urljoin from "url-join";

import { getResolutionFromVideoUrl } from "../_helpers/getResolutionFromVideoUrl";
import { hashPassword } from "../_helpers/hashPassword";
import { dangerousKeysOf } from "../_utils/dangerousKeysOf";
import { hasProperty } from "../_utils/hasProperty";
import { appConfig } from "../appConfig";
import { EntityRow, TypedEntitySchema } from "../entities/_utils/createTypedEntitySchema";
import { TypedRepository } from "../entities/_utils/TypedRepository";
import { courseColumns } from "../entities/Course";
import { CourseRow } from "../entities/Course/Course.entity.types";
import { courseClassColumns } from "../entities/CourseClass";
import { CourseClassRow } from "../entities/CourseClass/CourseClass.entity.types";
import { courseClassListColumns } from "../entities/CourseClassList";
import { CourseClassListRow } from "../entities/CourseClassList/CourseClassList.entity.types";
import { courseClassVideoColumns } from "../entities/CourseClassVideo";
import { CourseClassVideoRow } from "../entities/CourseClassVideo/CourseClassVideo.entity.types";
import { courseClassVideoFormatColumns } from "../entities/CourseClassVideoFormat";
import { CourseClassVideoFormatRow } from "../entities/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import { courseClassVideoQualityColumns } from "../entities/CourseClassVideoQuality";
import { CourseClassVideoQualityRow } from "../entities/CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import { courseEditionColumns } from "../entities/CourseEdition";
import { CourseEditionRow } from "../entities/CourseEdition/CourseEdition.entity.types";
import { faqColumns } from "../entities/Faq";
import { FaqRow } from "../entities/Faq/Faq.entity.types";
import { UserRoleCode } from "../entities/UserRole";
import { getCourseRepository } from "../repositories/Course";
import { getCourseClassRepository } from "../repositories/CourseClass";
import { getCourseClassListRepository } from "../repositories/CourseClassList";
import { getCourseClassVideoRepository } from "../repositories/CourseClassVideo";
import { getCourseClassVideoFormatRepository } from "../repositories/CourseClassVideoFormat";
import { getCourseClassVideoQualityRepository } from "../repositories/CourseClassVideoQuality";
import { getCourseEditionRepository } from "../repositories/CourseEdition";
import { getFaqRepository } from "../repositories/Faq";
import { getUserRepository } from "../repositories/User";
import { getUserRoleRepository } from "../repositories/UserRole";
import { getUserToUserRoleRepository } from "../repositories/UserToUserRole";

// #region envs
const { env } = process;

const { READ_DB_NAME } = env;
if (!READ_DB_NAME) throw new Error("READ_DB_NAME not defined");

if (!env.READ_DB_PORT) throw new Error("READ_DB_PORT variable not defined");
const READ_DB_PORT = Number(env.READ_DB_PORT);
if (!READ_DB_PORT) throw new Error("Invalid READ_DB_PORT value. Must be number");

const { READ_DB_USERNAME } = env;
if (!READ_DB_USERNAME) throw new Error("READ_DB_USERNAME not defined");

const { READ_DB_PASSWORD } = env;
if (!READ_DB_PASSWORD) throw new Error("READ_DB_PASSWORD not defined");

const { READ_DB_HOST } = env;
if (!READ_DB_HOST) throw new Error("READ_DB_HOST not defined");
// #endregion

export type MasterCourse = {
	id: number;
	code: string;
	name: string;
	url: string | undefined | null;
	semester: number;
	year: number;
	created_at: string;
	updated_at: string;
};

export type MasterTitle = {
	id: number;
	text: string | undefined | null;
	username: string | undefined | null;
	video_id: number | undefined | null;
	created_at: string | undefined | null;
	updated_at: string | undefined | null;
};

export type MasterVideo = {
	id: number;
	number: number;
	disabled: boolean;
	youtube: unknown;
	course_id: number;
	created_at: string;
	updated_at: string;
};

const trueLog = console.log;
console.log = () => null;

const getNewCourseIconUrl = async (readCourse: MasterCourse): Promise<string> => {
	const isAxiosError = (response: object): response is AxiosError => hasProperty(response, "isAxiosError");
	const iconUrl = `https://open.fing.edu.uy/Images/iconCourse/${readCourse.code}_image.svg`;

	const response = await axios.get(iconUrl).catch((e) => e);
	if (isAxiosError(response) || typeof response.data !== "string" || response.data.includes('<div id="root"></div>'))
		return appConfig.DEFAULT_COURSE_ICON_URL;

	const iconUrlSplit = iconUrl.split(".");
	const iconFileExtension = iconUrlSplit[iconUrlSplit.length - 1];
	const newIconPath = path.join(appConfig.COURSE_ICONS_PATH, `${readCourse.code}.${iconFileExtension}`);

	await new Promise((resolve) => {
		const writeStream = fs.createWriteStream(newIconPath);
		writeStream.on("close", resolve);
		https.get(iconUrl, (response) => response.pipe(writeStream));
	});

	return urljoin(appConfig.COURSE_ICONS_URL, `${readCourse.code}.${iconFileExtension}`);
};

export const getAvailableVideoQualitiesForCourseClass = async ({
	courseClassListCode,
	courseClassNo,
}: {
	courseClassListCode: string;
	courseClassNo: number;
}): Promise<Array<{ formats: Array<{ url: string; name: string }>; height: number; width: number }>> => {
	const baseUrl = `https://openfing-video.fing.edu.uy/media/${courseClassListCode}/${courseClassListCode}_${courseClassNo
		.toString()
		.padStart(2, "0")}`;
	const possibleFormatNames = ["webm", "mp4"];

	const result: Array<{ formats: Array<{ url: string; name: string }>; height: number; width: number }> = [];

	await Promise.all(
		possibleFormatNames.map(async (formatName) => {
			const url = `${baseUrl}.${formatName}`;
			const resolution = await getResolutionFromVideoUrl(url);

			if (resolution) {
				const quality = result.find((q) => q.height === resolution.height);
				const format = {
					url,
					name: formatName,
				};

				if (quality) quality.formats.push(format);
				else result.push({ height: resolution.height, width: resolution.width, formats: [format] });
			}
		})
	);

	return result;
};

(async () => {
	// const videoResolutionsFilePath = path.resolve(appConfig.FILES_PATH, "_videosResolutions.json");
	// const videoResolutionsFileContent = fs.existsSync(videoResolutionsFilePath)
	// 	? fs.readFileSync(videoResolutionsFilePath, "utf8")
	// 	: JSON.stringify((await axios.get("https://open.fing.edu.uy/_files/_videosResolutions.json")).data);
	// const videoResolutions: Array<{
	// 	courseCode: string;
	// 	classNo: number;
	// 	qualities: Array<{
	// 		width: number;
	// 		height: number;
	// 		formats: Array<{ name: string; url: string }>;
	// 	}>;
	// }> = JSON.parse(videoResolutionsFileContent).videoResolutions;

	const readDb = await createConnection({
		name: "read",
		database: READ_DB_NAME,
		port: READ_DB_PORT,
		type: "postgres",
		username: READ_DB_USERNAME,
		password: READ_DB_PASSWORD,
		host: READ_DB_HOST,
	});

	const masterCourses: MasterCourse[] = await readDb.query(`select * from courses;`);
	const masterTitles: MasterTitle[] = await readDb.query(`select * from titles;`);
	const masterVideos: MasterVideo[] = await readDb.query(`select * from videos;`);
	const hiddenCourseCodes = [
		"vyo19",
		"vyo15",
		"ftip",
		"introiq",
		"tcm1",
		"cc",
		"aimds",
		"introiqt",
		"hsi",
		"irq2",
		"prueba",
	];

	const videoResolutions: Array<{
		courseCode: string;
		classNo: number;
		qualities: Array<{
			width: number;
			height: number;
			formats: Array<{ name: string; url: string }>;
		}>;
	}> = [];

	const schema = "openfing";
	const writeDb = await createConnection(appConfig.dbConnectionOptions);

	await writeDb.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
	await writeDb.query(`CREATE SCHEMA "${schema}"`);
	await writeDb.runMigrations();

	const faqsJSON: Array<{ title: string; content: string }> = (
		await axios.get("https://open.fing.edu.uy/data/faq.json")
	).data.faqs;

	const adminUserRole = await getUserRoleRepository(writeDb).save({
		code: UserRoleCode.admin,
	});

	await getUserRoleRepository(writeDb).save({
		code: UserRoleCode.user,
	});

	const user = await getUserRepository(writeDb).save(
		getUserRepository(writeDb).create({
			email: "open@fing.edu.uy",
			uid: "openfing",
			password: await hashPassword(appConfig.dbConnectionOptions.password as string),
			name: "OpenFING",
			created_at: moment().toDate(),
			updated_at: moment().toDate(),
			deleted_at: null,
		})
	);

	await getUserToUserRoleRepository(writeDb).save({
		user_id: user.id,
		user_role_id: adminUserRole.id,
	});

	class EntityToCreate<T extends { id: number }> {
		private nextId = 1;
		public entities: T[] = [];

		public add = (t: T) => {
			t.id = this.nextId++;
			this.entities.push(t);
		};
	}

	const coursesToCreate = new EntityToCreate<CourseRow>();
	const courseEditionsToCreate = new EntityToCreate<CourseEditionRow>();
	const courseClassListsToCreate = new EntityToCreate<CourseClassListRow>();
	const courseClassesToCreate = new EntityToCreate<CourseClassRow>();
	const videosToCreate = new EntityToCreate<CourseClassVideoRow>();
	const videoQualitiesToCreate = new EntityToCreate<CourseClassVideoQualityRow>();
	const videoFormatsToCreate = new EntityToCreate<CourseClassVideoFormatRow>();
	const faqsToCreate = new EntityToCreate<FaqRow>();

	faqsJSON.forEach((faq, index) => {
		if (faq.title.includes("¿Cómo se puede comunicar con OpenFING?"))
			faq.content =
				"A través del <a href='https://es-la.facebook.com/openfing'>Facebook</a>, <a href='https://www.instagram.com/openfing'>Instagram</a> y del correo <a href='mailto:open@fing.edu.uy'>open@fing.edu.uy</a>";

		// TODO: check id generation
		faqsToCreate.add({
			id: 1,
			...getFaqRepository(writeDb).create({
				title: faq.title,
				content: faq.content,
				is_html: faq.content.includes("<"),
				position: index,
				created_by_id: user.id,
				updated_by_id: user.id,
			}),
		});
	});

	if (!fs.existsSync(appConfig.COURSE_ICONS_PATH)) fs.mkdirSync(appConfig.COURSE_ICONS_PATH, { recursive: true });

	const getCleanReadCourseName = (readCourse: MasterCourse) =>
		readCourse.name
			.replace(/\( *(Práctico|Teórico|Edición) *\)/g, "")
			.replace(/\( *Edición \d+ *\)/, "")
			.trim();

	const getCleanReadCourseCode = (readCourse: MasterCourse): string => {
		const { code, year } = readCourse;

		if (["iis19", "cis"].includes(code)) return "iis";
		else if (code === "economia") return "eco";
		else if (code === "et1p") return "et1";
		else if (["prog3-2018", "prog3-2020"].includes(code)) return "p3";
		else if (code === "cmm1p" || code === "cmm1e") return "cmm1";
		else if (code === "p4p") return "p4";
		else if (code === "dlp") return "dl";
		else if (["fbd-2020ct", "fbd-2020p"].includes(code)) return "fbd";
		else if (code === "introiqt") return "introiq";
		else if (["ac-2020p", "ac-2020l"].includes(code)) return "ac";
		else if (code === "iieee") return "iiee";
		else if (code === "maqelp") return "maqel";
		else if (["cmm2p", "cmm2l"].includes(code)) return "cmm2";

		const yearString = year.toString();

		const posibleEndings = [`-${yearString}`, yearString, `-${yearString.substr(-2)}`, yearString.substr(-2)];

		const res = posibleEndings.reduce(
			(result, posibleEnding) => (result.endsWith(posibleEnding) ? result.replace(posibleEnding, "") : result),
			code
		);

		return res;
	};

	const coursesByCode = new Map<string, CourseRow>();
	const courseEditionsByCode = new Map<string, CourseEditionRow[]>();

	for (const readCourse of masterCourses) {
		const cleanCourseCode = getCleanReadCourseCode(readCourse);
		let course = coursesByCode.get(cleanCourseCode);

		if (!course) {
			// TODO: check id generation
			course = {
				id: 1,
				...getCourseRepository(writeDb).create({
					name: getCleanReadCourseName(readCourse),
					visibility: hiddenCourseCodes.find((c) => c === readCourse.code) ? "hidden" : "public",
					code: cleanCourseCode,
					icon_url: await getNewCourseIconUrl(readCourse),
					eva: readCourse.url || null,
					created_at: moment(readCourse.created_at).toDate(),
					created_by_id: user.id,
					updated_at: moment(readCourse.updated_at).toDate(),
					updated_by_id: user.id,
				}),
			};
			coursesByCode.set(cleanCourseCode, course);

			coursesToCreate.add(course);
		}

		const courseEditions = courseEditionsByCode.get(cleanCourseCode);
		let edition = courseEditions?.find((e) => e.year === readCourse.year && e.semester === readCourse.semester);

		if (!edition) {
			edition = {
				// TODO: id
				id: 1,
				...getCourseEditionRepository(writeDb).create({
					name: `Edición ${readCourse.year}, ${
						readCourse.semester === 1 ? "primer semestre" : "segundo semestre"
					}`,
					year: readCourse.year,
					semester: readCourse.semester,
					course_id: course.id,
					visibility: course.visibility,
					created_at: moment(readCourse.created_at).toDate(),
					created_by_id: user.id,
					updated_at: moment(readCourse.updated_at).toDate(),
					updated_by_id: user.id,
					deleted_at: null,
					deleted_by_id: null,
				}),
			};

			courseEditionsToCreate.add(edition);

			if (courseEditions) courseEditions.push(edition);
			else courseEditionsByCode.set(cleanCourseCode, [edition]);
		}

		const courseClassList = {
			// TODO: id
			id: 1,
			...getCourseClassListRepository(writeDb).create({
				course_edition_id: edition.id,
				name: ["cmm1e", "p4p"].includes(readCourse.code)
					? readCourse.name
					: readCourse.code === "fbd-2020ct"
					? "Consulta Teórico"
					: readCourse.code === "iieee"
					? "Ejercicios Resueltos"
					: ["cmm2l", "ac-2020l"].includes(readCourse.code)
					? "Laboratorio"
					: readCourse.name.includes("Práctico") ||
					  ["dlp", "fbd-2020p", "introiq", "cmm2p"].includes(readCourse.code)
					? "Práctico"
					: readCourse.name.includes("Teórico") ||
					  ["iis19", "p4", "dl", "introiqt", "cmm2", "iiee", "maqel"].includes(readCourse.code)
					? "Teórico"
					: readCourse.code === "cis"
					? "Ciclos de charlas Ingeniería de Software"
					: "Default",
				code: readCourse.code,
				visibility: edition.visibility,
				created_at: moment(readCourse.created_at).toDate(),
				created_by_id: user.id,
				updated_at: moment(readCourse.updated_at).toDate(),
				updated_by_id: user.id,
			}),
		};
		courseClassListsToCreate.add(courseClassList);

		const getReadVideoQualities = async (
			readVideo: MasterVideo
		): Promise<
			Array<{
				width: number;
				height: number;
				formats: Array<{
					name: string;
					url: string;
				}>;
			}>
		> => {
			await new Promise((resolve) => setTimeout(resolve, 0));
			const readCourse = masterCourses.find((rc) => rc.id === readVideo.course_id);

			if (!readCourse) {
				trueLog(`No se encontró curso con id ${readVideo.course_id}`);

				return [];
			}

			const savedQualities =
				videoResolutions.find((vr) => vr.classNo === readVideo.number && vr.courseCode === readCourse.code)
					?.qualities || [];

			if (savedQualities.length === 0) {
				const qualities = await getAvailableVideoQualitiesForCourseClass({
					courseClassListCode: readCourse.code,
					courseClassNo: readVideo.number,
				});

				if (qualities.length > 0) {
					videoResolutions.push({
						classNo: readVideo.number,
						courseCode: readCourse.code,
						qualities,
					});

					return qualities;
				} else
					trueLog(`No se encontraron videos para la clase ${readVideo.number} del curso ${readCourse.code}`);
			}

			return savedQualities;
		};

		const courseReadVideos = masterVideos.filter((rv) => rv.course_id === readCourse.id);

		for (const readVideo of courseReadVideos) {
			const qualities = await getReadVideoQualities(readVideo);

			if (!qualities) trueLog("No se pudieron obtener los datos de los videos de la clase.");

			const readTitle = masterTitles.find((t) => t.video_id === readVideo.id);
			const courseClassTitle = (readTitle && readTitle.text) || `Clase ${readVideo.number}`;

			const createdAt = moment(readVideo.created_at).toDate();
			const createdById = user.id;
			const updatedAt = moment(readVideo.updated_at).toDate();
			const updatedById = user.id;

			// TODO: id
			const courseClass = {
				id: 1,
				...getCourseClassRepository(writeDb).create({
					course_class_list_id: courseClassList.id,
					number: readVideo.number,
					visibility: readVideo.disabled ? "disabled" : courseClassList.visibility,
					name: courseClassTitle,
					published_at: createdAt,
					created_at: createdAt,
					created_by_id: createdById,
					updated_at: updatedAt,
					updated_by_id: updatedById,
					deleted_at: null,
					deleted_by_id: null,
				}),
			};

			courseClassesToCreate.add(courseClass);

			const video = {
				id: 1,
				...getCourseClassVideoRepository(writeDb).create({
					course_class_id: courseClass.id,
					position: 1,
					name: "Clase",
					visibility: "public",
					created_at: createdAt,
					created_by_id: createdById,
					updated_at: updatedAt,
					updated_by_id: updatedById,
					deleted_at: null,
					deleted_by_id: null,
				}),
			};

			videosToCreate.add(video);

			if (qualities)
				for (const readVideoQuality of qualities) {
					const videoQuality = {
						id: 1,
						...getCourseClassVideoQualityRepository(writeDb).create({
							course_class_video_id: video.id,
							width: readVideoQuality.width,
							height: readVideoQuality.height,
							created_at: createdAt,
							created_by_id: createdById,
							updated_at: updatedAt,
							updated_by_id: updatedById,
							deleted_at: null,
							deleted_by_id: null,
						}),
					};

					videoQualitiesToCreate.add(videoQuality);

					for (const readVideoFormat of readVideoQuality.formats) {
						const videoFormat = {
							id: 1,
							...getCourseClassVideoFormatRepository(writeDb).create({
								course_class_video_quality_id: videoQuality.id,
								name: readVideoFormat.name,
								url: readVideoFormat.url,
								created_at: createdAt,
								created_by_id: createdById,
								updated_at: updatedAt,
								updated_by_id: updatedById,
								deleted_at: null,
								deleted_by_id: null,
							}),
						};

						videoFormatsToCreate.add(videoFormat);
					}
				}
		}
	}

	const toCSV = (value: unknown): string | number => {
		const valueIsUndefinedOrNull = (value: unknown): value is undefined | null =>
			[undefined, null].some((i) => i === value);
		if (valueIsUndefinedOrNull(value)) return "";

		if (typeof value === "boolean") return value ? "t" : "f";

		const valueIsStringOrNumber = (value: unknown): value is string | number =>
			["string", "number"].includes(typeof value);
		if (valueIsStringOrNumber(value)) return value;

		if (value instanceof Date) {
			const date = moment(value);

			return date.format("YYYY-MM-DD HH:mm:ss.SS") + date.format("Z").split(":")[0];
		}

		console.error("Could not get type from of", value);
		return "";
	};

	const valuesFrom = <T extends Record<string, unknown>>(value: T, keys: Array<[string, string]>): unknown[] =>
		keys.map((k) => value[k[0]]);

	const getToCreateItem = <T extends TypedEntitySchema>(
		entityToCreate: EntityRow<T>["id"] extends number ? EntityToCreate<EntityRow<T> & { id: number }> : never,
		repository: TypedRepository<T>,
		keys: Array<[string, string]>
	) => ({
		entityToCreate,
		repository,
		keys,
	});

	courseEditionsToCreate.entities.sort(
		(ce1, ce2) => -((ce1.year || 0) + (ce1.semester || 0) / 10 - ((ce2.year || 0) + (ce2.semester || 0) / 10))
	);

	videoFormatsToCreate.entities.sort((vf1) => (vf1.name === "mp4" ? 1 : -1));

	let i = 0;
	for (const toCreate of [
		getToCreateItem(
			coursesToCreate,
			getCourseRepository(writeDb)._typedRepository,
			dangerousKeysOf(courseColumns).map((k) => [k, courseColumns[k].name])
		),
		getToCreateItem(
			courseEditionsToCreate,
			getCourseEditionRepository(writeDb)._typedRepository,
			dangerousKeysOf(courseEditionColumns).map((k) => [k, courseEditionColumns[k].name])
		),
		getToCreateItem(
			courseClassListsToCreate,
			getCourseClassListRepository(writeDb)._typedRepository,
			dangerousKeysOf(courseClassListColumns).map((k) => [k, courseClassListColumns[k].name])
		),
		getToCreateItem(
			courseClassesToCreate,
			getCourseClassRepository(writeDb)._typedRepository,
			dangerousKeysOf(courseClassColumns).map((k) => [k, courseClassColumns[k].name])
		),
		getToCreateItem(
			videosToCreate,
			getCourseClassVideoRepository(writeDb)._typedRepository,
			dangerousKeysOf(courseClassVideoColumns).map((k) => [k, courseClassVideoColumns[k].name])
		),
		getToCreateItem(
			videoQualitiesToCreate,
			getCourseClassVideoQualityRepository(writeDb)._typedRepository,
			dangerousKeysOf(courseClassVideoQualityColumns).map((k) => [k, courseClassVideoQualityColumns[k].name])
		),
		getToCreateItem(
			videoFormatsToCreate,
			getCourseClassVideoFormatRepository(writeDb)._typedRepository,
			dangerousKeysOf(courseClassVideoFormatColumns).map((k) => [k, courseClassVideoFormatColumns[k].name])
		),
		getToCreateItem(
			faqsToCreate,
			getFaqRepository(writeDb)._typedRepository,
			dangerousKeysOf(faqColumns).map((k) => [k, faqColumns[k].name])
		),
	]) {
		i++;
		const { entities } = toCreate.entityToCreate;
		if (entities.length === 0) return;

		const stringify = async (p: unknown[][]) => {
			p = p.map((i) => i.map((value) => toCSV(value)));

			const result = await new Promise((resolve) =>
				csvStringify(p, (err, output) => {
					resolve(output);
				})
			);

			return result;
		};

		const filePath = path.join(__dirname, `__${i}`);
		fs.writeFileSync(
			filePath,
			await stringify((entities as Array<Record<string, unknown>>).map((e) => valuesFrom(e, toCreate.keys)))
		);
		const fileStream = fs.createReadStream(filePath);

		const pool = new Pool({
			database: appConfig.dbConnectionOptions.database,
			password: appConfig.dbConnectionOptions.password as string,
			port: appConfig.dbConnectionOptions.port,
			user: appConfig.dbConnectionOptions.username,
			host: appConfig.dbConnectionOptions.host,
		});

		try {
			await new Promise((resolve, reject) => {
				pool.connect((err, client, done) => {
					if (err) reject(err);

					const stream = client.query(
						copyFrom(
							`COPY ${toCreate.repository.metadata.schema ?? ""}.${
								toCreate.repository.metadata.tableName
							} (${toCreate.keys.map((e) => `"${e[1]}"`).join(", ")}) FROM STDIN WITH CSV;`
						)
					);

					new Promise((resolve, reject) => {
						fileStream.on("error", () => {
							done();
						});

						stream.on("error", (e) => {
							trueLog(e);
							done();
							reject(e);
						});
						stream.on("finish", () => {
							done();
							resolve();
						});

						fileStream.pipe(stream);
					})
						.then(resolve)
						.catch(reject);
				});
			});
			await writeDb.query(
				`SELECT setval(pg_get_serial_sequence('${toCreate.repository.metadata.schema}.${toCreate.repository.metadata.tableName}', 'id'), max(id)) FROM ${toCreate.repository.metadata.schema}.${toCreate.repository.metadata.tableName}; `
			);
		} catch (e) {
			trueLog("error");
			trueLog(e);
			process.exit(1);
		}

		fs.unlinkSync(filePath);
	}

	// fs.writeFileSync(videoResolutionsFilePath, JSON.stringify({ videoResolutions }, undefined, 2));
	trueLog("- listo!");
	process.exit(0);
})();
