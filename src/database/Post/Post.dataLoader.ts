import { Pool } from "pg"

import { getFindPostDataLoader } from "./findPostBatch"

export type PostDataLoader = ReturnType<typeof getPostDataLoader>

export function getPostDataLoader(pool: Pool) {
	return {
		find: getFindPostDataLoader(pool),
	}
}
