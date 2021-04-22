
const prepareArgs = params => {

	const argsArray = [] 

	for(const key in params){
		argsArray.push(`${key}: "${params[key]}"`)
	}

	return `{ ${argsArray.join(' ')} }`

}

export default prepareArgs
