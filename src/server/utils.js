const parseUrl = async url => {
	const charToUse = '='
	const array = url.split(/(\?|\&)/).filter(e => e.match(charToUse))
	const obj = new Object
	for(let i = 0; i < array.length; i++){
		const [ key, value ] = array[i].split(charToUse)
		obj[key] = value
	}
	console.log(obj)
	if(Object.keys(obj).length > 0){
		return obj
	}else{
		return null
	}
}

exports.parseUrl = parseUrl
