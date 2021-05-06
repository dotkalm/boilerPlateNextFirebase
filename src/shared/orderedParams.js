const orderedParams = object => {
	const params = new URLSearchParams()
	for(const key in object){
		params.append( key, object[key] )
	}
	params.sort()
	console.log(params)
	return `?${params.toString()}`
}
export default orderedParams
