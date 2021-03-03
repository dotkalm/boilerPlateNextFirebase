export const makeDivs = edges => {
	let string = `linear-gradient(to bottom`
	for(let i = 0; i< edges.length; i++){
		const { r , g , b } = edges[i].node
		string = `${string}, rgba(${r},${g},${b}, 1)`
	}
	string = `${string})`
	return string
}
