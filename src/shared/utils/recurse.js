const jsonRecurse = (jsonObject, accumulator) => {
	for(const key in jsonObject){
		if(typeof(jsonObject[key]) === 'object'){
			if(!Array.isArray(jsonObject[key])){
				accumulator[key] = jsonRecurse(jsonObject[key], {})
			}else{
				const len = jsonObject[key].length
				accumulator[key] = jsonRecurse(jsonObject[key], new Array(len))
			}
		}else{
			if(key !== ''){
				accumulator[key] = jsonObject[key]
			}
		}
	}
	console.log(jsonObject,accumulator)
	return accumulator
}
export default jsonRecurse
