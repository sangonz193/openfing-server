import * as yup from "yup"

import { CreateCourseClassChapterCueDataInput } from "../../schemas.types"

export type ValidatedCreateCourseClassChapterCueDataInput = CreateCourseClassChapterCueDataInput

export type ValidateCreateCourseClassChapterCueDataInputResult =
	| {
			success: true
			input: ValidatedCreateCourseClassChapterCueDataInput
	  }
	| {
			success: false
	  }

export async function validateCreateCourseClassChapterCueDataInput(
	input: CreateCourseClassChapterCueDataInput
): Promise<ValidateCreateCourseClassChapterCueDataInputResult> {
	const validatedInput = await yup
		.object<yup.SchemaOf<CreateCourseClassChapterCueDataInput>["fields"]>({
			name: yup.string().required(),
			startSeconds: yup.number().required(),
			endSeconds: yup.number().required(),
		})
		.required()
		.validate(input, {
			abortEarly: false,
		})
		.catch(() => null)

	if (!validatedInput) {
		return { success: false }
	}

	return { success: true, input: validatedInput }
}
