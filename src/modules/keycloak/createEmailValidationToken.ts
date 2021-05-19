export function createEmailValidationToken(userId: string) {
	return Buffer.from(userId).toString("base64");
}
