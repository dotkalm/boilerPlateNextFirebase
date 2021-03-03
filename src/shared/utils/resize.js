export const resize = (obj1, obj2) => {
	const [ aWidth, aHeight ] = obj1
	const [ bWidth, bHeight ]  = obj2
	let solution
	if(aWidth){
		const first = aWidth * bHeight
		solution = first / bWidth 
	}
	if(aHeight){
		const first = aHeight * bWidth
		solution = first / bHeight
	}
	return solution
}
