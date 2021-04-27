export const makeMutation = object => {
	const { hmac, shop, timestamp, state, host, code } = object
	
	const mutation = `
		mutation{
			addStore(
				shop:
					{
						name:"${shop}"
						timestamp: ${timestamp} 
						hmac: "${hmac}"
						state: "${state}"
						host: "${host}"
						code: "${code}"
					}
			){
				name
				redirectURL
				token
			}
		}
	`
	return mutation
}
