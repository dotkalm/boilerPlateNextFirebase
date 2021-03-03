export const mq = () => {
	const array = []
	for(let i=3; i<50; i++){
		const screenMax = i * 100
		const screenMin = (i-1) * 100
		array.push(`@media only screen and (max-width: ${screenMax}px) and (min-width: ${screenMin}px)  {
				.imgStyle{
					width: ${screenMin}px;
				}
		}`)
	}
	return array.join('')
}
