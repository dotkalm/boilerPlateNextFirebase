const orderedParams = object => {
	const params = new URLSearchParams()
	for(const key in object){
		params.append( key, object[key] )
	}
	params.sort()
	return `?${params.toString()}`
}
export default orderedParams
