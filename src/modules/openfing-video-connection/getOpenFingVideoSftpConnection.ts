import SSH2Promise from "ssh2-promise"

import { openFingVideoSftpConfig } from "./openFingVideoSftp.config"

export const getOpenFingVideoSftpConnection = async () => {
	const { connectionOptions } = openFingVideoSftpConfig

	if (!connectionOptions) {
		return
	}

	try {
		const ssh = new SSH2Promise(connectionOptions)
		await ssh.connect()

		return ssh.sftp()
	} catch {
		return null
	}
}
