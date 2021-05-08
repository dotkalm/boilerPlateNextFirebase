const jsonRecurse = (jsonObject, accumulator, callback) => {
	for(const key in jsonObject){
		if(typeof(jsonObject[key]) === 'object'){
			if(!Array.isArray(jsonObject[key])){
				accumulator[key] = jsonRecurse(jsonObject[key], {}, callback)
			}else{
				const len = jsonObject[key].length
				accumulator[key] = jsonRecurse(jsonObject[key], new Array(len), callback)
			}
		}else{
			if(key !== ''){
				accumulator[key] = jsonObject[key]
			}
		}
	}
	callback(accumulator)
	return accumulator
}
export default jsonRecurse
