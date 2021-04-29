export const makeParams = object => {
	let string = ''	
	for(const key in object){
		const value = object[key]
		if(!isNaN(value * value)){
			string = `${string} ${key}: ${value}`
		}else{
			string = `${string} ${key === 'shop' ? 'name' : key}: "${value}"`
		}
	}
	return string
}
export const makeMutation = object => {
	const string = makeParams(object)
	return `
		mutation{
			addStore(
				shop:
					{
						${string}
					}
			){
				uid
				name
				redirectURL
				jwt	
				scope
			}
		}
	`
}
export const getStore = async object => {
	const string = makeParams(object)
	return `
		{
			ShopSession(
				session: { ${string} }
			){
				uid
				valid
				hmac
				jwt
				name
				remaining
			}
		}
	`
}
