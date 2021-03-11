const getBoundingBox = array => {
	let S = Infinity 
	let N = -Infinity 
	let E = -Infinity 
	let W = Infinity 
	const innerCalcs = arr => {
		const { lat, lng } = arr
		if(lat > N){
			N = lat
		}
		if(lat < S){
			S = lat
		}
		if(lng > E){
			E = lng
		}
		if(lng < W){
			W = lng
		}
	}
	for(let i = 0; i < array.length; i++){
		innerCalcs(array[i])
	}
	return { N, E, S, W } 
}

export const findCenter = array => {
	const box = getBoundingBox(array.flat(1))
	const { N, E, S, W } = box
	const lat = (N + S) / 2
	const lng = (E + W) / 2
	return { lat, lng, box } 
}

