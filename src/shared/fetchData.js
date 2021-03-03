import { getCollection } from '../server/firebaseNode'
export const getArtwork = async () => {
	const art = await	getCollection('artwork')
	const shuffle = art.sort((x,y) => {
		const a = Math.random()
		const b = Math.random()
		if(a > b){
			return 1
		}else{
			return -1
		}
	})
	return shuffle
}

