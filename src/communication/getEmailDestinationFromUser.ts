import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation"

import { getEmail } from "../typed-atoms/Email"
import { EmailDestination } from "./EmailDestination"

export async function getEmailDestinationFromUser(
	userRepresentation: UserRepresentation
): Promise<EmailDestination | null> {
	const name = [userRepresentation.firstName, userRepresentation.lastName].filter(Boolean).join("\n")
	const email = userRepresentation.email && (await getEmail(userRepresentation.email))

	return email ? { name, email } : null
}
