import url from 'url'

export const parseUrl = str => {
	const regExpString = '/^\/\?/'
	const regex = new RegExp(regExpString)
	if(str.match(regex)){
		const newstring = str.replace(regex, '')
		return new url.URLSearchParams(newstring)
	}else{
		return null 
	}
}
