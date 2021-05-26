import fetch from "node-fetch"

export const videoUrlHasTorrent = async (url: string) => {
	return fetch(url + ".torrent")
		.then((e) => e.status !== 404)
		.catch(() => false)
}
