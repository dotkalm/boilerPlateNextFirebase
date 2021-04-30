export const makeParams = object => {
	let string = ''	
	for(const key in object){
		const value = object[key]

		const isBoolean = element => {
			if(element === String(true) || element === String(false)){
				return true
			}else{
				return false
			}
		}
		if(!isNaN(value * value) || isBoolean(value)){
			string = `${string} ${key}: ${value}`
		}else{
			string = `${string} ${key === 'shop' ? 'name' : key}: "${value}"`
		}
	}
	return string
}
export const makeMutation = object => {
	console.log(object)
	const string = makeParams(object)
	return `
		mutation{
			addStore(
				shop:
					{
						${string}
					}
			){
				jwt
				name
			}
		}
	`
}
export const validateHmac = object => {
	const string = makeParams(object)
	return `
		{
			ValidateHmac(
				params: { ${string} }
			){
				shop
				valid
				installed
				jwt
				nonce
				redirectUrl
			}
		}
	`
}
export const requestJwt = object => {
	const string = makeParams(object)
	return `
		{
			ShopSession(
				session: { ${string} }
			){
				jwt
			}
		}
	`
}
