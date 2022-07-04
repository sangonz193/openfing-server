import axios from "axios"

export const videoUrlHasTorrent = async (url: string) => {
	return axios
		.head(url + ".torrent")
		.then((e) => e.status !== 404)
		.catch(() => false)
}
