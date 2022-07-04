import { and, max, merge, min, objectAsync, or, string, trim, undefinedV } from "@sangonz193/ts-validation"

export const updateCourseInputValidationSchema = objectAsync({
	name: and(
		string(),
		merge<string>()(
			trim(), //
			max<string>(320)
		)
	),

	visibility: and(
		string(),
		merge<string>()(
			trim(), //
			max<string>(320)
		)
	),

	firstName: and(
		string(),
		merge<string>()(
			trim(), //
			min<string>(1),
			max<string>(200)
		)
	),

	lastName: or(
		undefinedV(),
		and(
			string(),
			merge<string>()(
				trim(), //
				max<string>(200)
			)
		)
	),
})
