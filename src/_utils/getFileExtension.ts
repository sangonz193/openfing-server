export const getFileExtension = (filename: string): string => {
	return filename.slice((Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1);
};
