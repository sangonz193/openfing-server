export function createEmailValidationToken(emailValidationId: string) {
	return Buffer.from(emailValidationId).toString("base64")
}
