export const makeMutation = object => {
	const { hmac, shop, timestamp, state, host, code } = object
	let string = ''	
	for(const key in object){
		const value = object[key]
		if(!isNaN(value * value)){
			string = `${string} ${key}: ${value}`
		}else{
			string = `${string} ${key === 'shop' ? 'name' : key}: "${value}"`
		}
	}
	const mutation = `
		mutation{
			addStore(
				shop:
					{
						${string}
					}
			){
				name
				redirectURL
				access_token
				scope
			}
		}
	`
	return mutation
}
