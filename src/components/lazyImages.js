import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { mq } from '../shared/utils/mq'
import dynamic from 'next/dynamic'
const DynLazyImages = dynamic(import('./dynLazyImages'))

export const RowDiv = styled.div`
	text-align: center;
	margin: 0;
	paddingTop: 1em;
`
const ImageStyle = styled.img`
`
const LazyImages = ({ 
	ui,
	image, 
	index,
	current, 
	router,
	setCurrent,
	loadingHook, 
	setLoadingHook,
	loadedIndex, 
	setLoadedIndex, 
}) => {
	const [ loaded, setLoaded ] = useState(false)
	const { hires, thumb, description, imageRefs } = image 
	return(
		<div key={index}>
				{ index <= current 
					? 
						<DynLazyImages
							ui={ui}
							router={router}
							current={current}
							setCurrent={setCurrent}
							setLoaded={setLoaded}
							index={index}
							image={image}
							loadingHook={loadingHook}
							setLoadingHook={setLoadingHook}
							loadedIndex={loadedIndex}
							setLoadedIndex={setLoadedIndex}
						/> 
					: '' 
				}
		</div>
	)
}

export default LazyImages

