import SSH2Promise from "ssh2-promise";

import { appConfig } from "../appConfig";

export const getOpenFingVideoSftpConnection = async () => {
	const { openFingVideoSftpConnectionOptions } = appConfig;
	if (!openFingVideoSftpConnectionOptions) return;

	try {
		const ssh = new SSH2Promise({
			host: openFingVideoSftpConnectionOptions.host,
			username: openFingVideoSftpConnectionOptions.username,
			privateKey: Buffer.from(openFingVideoSftpConnectionOptions.privateKeyBase64, "base64").toString("utf-8"),
		});
		await ssh.connect();

		return ssh.sftp();
	} catch (e) {
		return null;
	}
};
