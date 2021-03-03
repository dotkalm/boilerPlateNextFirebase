import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { mq } from '../shared/utils/mq'
export const RowDiv = styled.div`
	text-align: center;
`
const DynMobile = ({ width, height, uid, thumb, original, title, levels, description }) => {
	const [ loaded, setLoaded ] = useState(false)
	const [ url, setUrl ] = useState(thumb)
	const imgRef = useRef();
	useEffect(() => {
		if (imgRef.current && imgRef.current.complete) {
			setLoaded(true);
		}
	}, [ imgRef, loaded ]);
	return(
		<RowDiv	
		>
			{loaded ? '' : 
				<img className='imgStyle' 
					src={thumb} 
					alt={title}
					aria-hidden="true" 
					style={{
						width: `${width}px`,
						height: `${height}px`,
					}}
				/> 
			}
			<img className='imgStyle' 
				src={original} 
				alt={title}
				ref={imgRef}
				style={{
					width: `${width}px`,
					height: `${height}px`,
					contentVisibility: loaded ? 'visible' : 'hidden',
					visibility: !loaded ? 'none' : 'visible',
					display: !loaded ? 'none' : 'flex',
				}}
			/> 
		</RowDiv>
	)
}

export default DynMobile 

