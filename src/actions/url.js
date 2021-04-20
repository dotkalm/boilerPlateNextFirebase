const url  = require('url')

exports.parseUrl = str => {
	console.log(str, 4)
	const regExpString = '/^\/\?/'
	const regex = new RegExp(regExpString)
	if(str.match(regex)){
		const newstring = str.replace(regex, '')
		return new url.URLSearchParams(newstring)
	}else{
		return null 
	}
}
