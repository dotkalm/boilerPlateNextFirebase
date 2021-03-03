const unpack = ({ edges }) => {
	const newArray = new Array(edges.length)
	for(let i=0; i<edges.length; i++){
		const { node } = edges[i] 
		newArray[i] = node
	}
	return newArray
}
export default unpack
