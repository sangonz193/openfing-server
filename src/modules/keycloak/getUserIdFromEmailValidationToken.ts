export function getUserIdFromEmailValidationToken(token: string) {
	return Buffer.from(token, "base64").toString();
}
