import * as yup from "yup";

import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getGenericError } from "../_utils/getGenericError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { backupDb } from "../../_helpers/backupDb";
import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import { identity } from "../../_utils/identity";
import { identityMap } from "../../_utils/identityMap";
import { CourseClassVisibility } from "../../entities/CourseClass";
import {
	CreateCourseClassInputVisibility,
	MutationCreateCourseClassArgs,
	Resolvers,
} from "../../generated/graphql.types";
import { getCreateCourseClassPayloadParent } from "../CreateCourseClassPayload/CreateCourseClassPayload.parent";

const resolver: Resolvers["Mutation"]["createCourseClass"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);

	if (!user) return getAuthenticationError();

	const { dataLoaders } = context;

	const validatedData = await yup
		.object<MutationCreateCourseClassArgs["input"]>({
			courseClassListId: yup.string().required(),
			name: yup.string().trim().max(200).required(),
			number: yup.number().moreThan(0).lessThan(1000).required(),
			visibility: yup.string().oneOf<Exclude<MutationCreateCourseClassArgs["input"]["visibility"], null>>(
				dangerousKeysOf(
					identityMap<Exclude<MutationCreateCourseClassArgs["input"]["visibility"], null | undefined>>({
						DISABLED: "",
						HIDDEN: "",
						PUBLIC: "",
					})
				)
			),
		})
		.required()
		.validate(args.input);

	const numberId = Number(validatedData.courseClassListId) || undefined;

	if (!numberId) return getGenericError();

	const courseClassList = await context.dataLoaders.courseClassList.findOne({
		id: numberId,
		includeDisabled: true,
		includeHidden: true,
	});

	if (!courseClassList) return getGenericError();

	const courseClasses = await dataLoaders.courseClass.findAll({
		courseClassListId: courseClassList.id,
		includeDisabled: true,
		includeHidden: true,
	});

	let courseClassWithSameNumber = courseClasses.find((courseClass) => courseClass.number === validatedData.number);

	if (!courseClassWithSameNumber) {
		courseClassWithSameNumber = await dataLoaders.courseClass.save(
			dataLoaders.courseClass.create({
				createdById: user.id,
				courseClassListId: courseClassList.id,
				name: validatedData.name,
				visibility: identity<Record<Extract<CreateCourseClassInputVisibility, string>, string>>({
					DISABLED: CourseClassVisibility.disabled,
					HIDDEN: CourseClassVisibility.hidden,
					PUBLIC: CourseClassVisibility.public,
				})[validatedData.visibility || "PUBLIC"],
				number: validatedData.number,
			})
		);

		await backupDb(context.ormConnection);

		return getCreateCourseClassPayloadParent({
			courseClass: courseClassWithSameNumber,
		});
	}

	return getGenericError();
};

export default resolver;
