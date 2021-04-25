export const makeQueryString = arr => {
	let string = ''
	for(let i = 0; i < arr.length; i++){
		const { key, value } = arr[i] 
		if(i === 0){
			string = `${key}=${value}`
		}else{
			string = `${string}&${key}=${value}`
		}
	}
	return string
}
