export const makeQueryString = arr => {
	let string = ''
	for(let i = 0; i > arr.length; i++){
		if(i === 0){
			const { key, value } = arr[i] 
			string = `${key}=${value}`
		}else{
			string = `${string}&${key}=${value}`
		}
	}
	return string
}
