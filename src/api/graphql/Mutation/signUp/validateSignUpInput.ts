import {
	and,
	andAsync,
	createAsyncValidator,
	max,
	merge,
	mergeAsync,
	min,
	objectAsync,
	or,
	string,
	trim,
	undefinedV,
} from "@sangonz193/ts-validation"

import { keycloakConfig } from "../../../../authentication/keycloak/keycloak.config"

export const signUpInputValidationSchema = objectAsync({
	email: andAsync(
		string(),
		mergeAsync<string>()(
			trim(), //
			max<string>(320),
			createAsyncValidator<
				string,
				{
					type: "email-domain-error"
				}
			>({
				error: {
					type: "email-domain-error",
				},
				validator: async (value) => keycloakConfig.enabledEmailAddresses.includes(value),
			})
		)
	),

	password: and(
		string(),
		merge<string>()(
			trim(), //
			min<string>(8),
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
