import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { mq } from '../shared/utils/mq'
import dynamic from 'next/dynamic'
import { BouncingArrow } from '../shared/utils/bouncingArrow'
const DynMobile = dynamic(import('./dynImages'))

export const RowDiv = styled.div`
	text-align: center;
	${mq()}
`
const ImageStyle = styled.img`
`
const MobileImages = ({ 
	image, 
	index, 
	current,
	loadingHook,
	setLoadingHook,
}) => {
	const [ loaded, setLoaded ] = useState(false)
	const { primaryImage, thumb, description, imageRefs } = image 
	return(
		<div key={index}>
			<RowDiv>
				{ index <= current 
					? 
						<DynMobile
							setLoaded={setLoaded}
							image={image}
							loadingHook={loadingHook}
							setLoadingHook={setLoadingHook}
						/> 
					: '' 
				}
			</RowDiv>
			{index === current ? <BouncingArrow/> : ''} 
		</div>
	)
}

export default MobileImages

