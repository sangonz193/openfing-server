export function getEmailValidationIdFromEmailValidationToken(token: string) {
	return Buffer.from(token, "base64").toString()
}
