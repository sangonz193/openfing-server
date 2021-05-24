export async function arrayMapLimit<T extends any>(
	runItem: (index: number) => Promise<T>,
	length: number,
	limit: number
): Promise<T[]> {
	const result: T[] = [];
	let nextIndex = 0;

	const runNext = async () => {
		const index = nextIndex;
		nextIndex++;

		if (index < length) {
			const item = await runItem(index);
			await runNext();

			result[index] = item;
		}
	};
	await Promise.all(Array(limit).fill(null).map(runNext));

	return result;
}
