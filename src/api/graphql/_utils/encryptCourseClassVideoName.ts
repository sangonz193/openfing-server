import { spawn } from "promisify-child-process";

import { appConfig } from "../../../config/app.config";

export const encryptCourseClassVideoName = async (name: string): Promise<string | null> => {
	const { disabledCourseClassVideoEncryptionKey } = appConfig;
	if (!disabledCourseClassVideoEncryptionKey) {
		return null;
	}

	const getResult = async () => {
		const echo = spawn("echo", [name]);

		return (
			await spawn(
				"openssl",
				["enc", ...["-k", disabledCourseClassVideoEncryptionKey], "-aes256", "-base64", "-e", "-salt"],
				{
					stdio: [echo.stdout, "pipe", process.stderr],
					encoding: "utf8",
				}
			)
		).stdout;
	};

	try {
		let result = await getResult();

		while (typeof result === "string" && result[10] === "+") {
			result = await getResult();
		}

		if (typeof result === "string") {
			result = result.substr(10);
			result = result.replace(/\n/g, "");
			result = result.replace(/\+/g, "-");
			result = result.replace(/\//g, "_");
			result = result.replace(/=/g, "");

			return result;
		}
	} catch (e) {
		console.log(e);
	}

	return null;
};
