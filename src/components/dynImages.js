import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { mq } from '../shared/utils/mq'
export const RowDiv = styled.div`
	text-align: center;
`
const DynMobile = ({ image, loadingHook, setLoadingHook }) => {
	const { primaryImage, thumb, description, imageRefs } = image 
	const [ loaded, setLoaded ] = useState(false)
	const [ url, setUrl ] = useState(thumb)
	const imgRef = useRef();
	useEffect(() => {
		if (imgRef.current && imgRef.current.complete) {
			setLoaded(true);
			setLoadingHook(false)
		}
	}, [ imgRef, loaded, loadingHook ]);
	if(!loaded && loadingHook === false){
		setLoadingHook(true)
	}
	const [ meta ] = imageRefs
	const { width, height, name } = meta
	return(
		<RowDiv>
			{loaded ? '' : 
				<img className='imgStyle' 
					src={thumb} aria-hidden="true" 
				/> 
			}
			<img
				className='imgStyle'
				alt={description}
				src={primaryImage}
				ref={imgRef}
				onLoad={() => setLoaded(true)}
				style={{
					contentVisibility: loaded ? 'visible' : 'hidden',
					visibility: !loaded ? 'none' : 'visible',
					display: !loaded ? 'none' : 'flex',
				}}
			/>	
		</RowDiv>
	)
}

export default DynMobile 

