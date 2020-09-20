import _fs from "fs";
import path from "path";
import SFTP from "ssh2-promise/dist/sftp";

const fs = _fs.promises;

export const uploadRecursive = async (options: { fromPath: string; toPath: string; sftp: SFTP }) => {
	const { fromPath, toPath, sftp } = options;
	const isDirectory = (await fs.lstat(fromPath)).isDirectory();

	if (!isDirectory)
		await new Promise(async (resolve, reject) => {
			const readStream = _fs.createReadStream(fromPath);
			const writeStream = await sftp.createWriteStream(toPath);

			writeStream.on("close", () => resolve());
			writeStream.on("error", reject);

			readStream.pipe(writeStream);
		});
	else {
		let shouldCreateFolder = true;

		try {
			const lsStat = await sftp.lstat(toPath);

			if (!lsStat.isDirectory()) await sftp.unlink(toPath);
			else shouldCreateFolder = false;
		} catch (e) {}

		if (shouldCreateFolder) await sftp.mkdir(toPath);

		const folderContent = await fs.readdir(fromPath);

		for (const item of folderContent)
			await uploadRecursive({
				fromPath: path.join(fromPath, item),
				toPath: path.join(toPath, item),
				sftp,
			});
	}

	console.log(`- uploaded: ${fromPath} to ${toPath}`);
};
