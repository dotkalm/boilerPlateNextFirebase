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
		mutation{
			requestJwt(session:{ ${string} }){
					jwt
				}
			}
	`
}
export const basesRequest = () => {
	return `
		{
			bases(date:1620691110632){
				edges{
					cursor
					node{
						name
						apiService
						apiServiceId
					}
				}
				pageInfo{
					endCursor
					hasNextPage
					hasPreviousPage
				}
			}
		}
	`
}
