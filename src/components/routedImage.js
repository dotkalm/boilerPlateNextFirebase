import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
const DeepZooms = dynamic(() => import('./DeepZoom'), { ssr: false })
import { 
	PageContainer, 
	LazyContainer, 
	Header 
} from './style'

const RoutedImage = ({ width, height, description, uid, title, levels, thumb, original }) => {
	const [ deepZoom, setDeepZoom ] = useState(false)
	useEffect(()=>{
		if(window){
			const { document } = window
			if(!deepZoom && document){
				setDeepZoom(true)
			}
		}
	}, [ deepZoom ])

	if(deepZoom){
		return(
			<div key={`${title}_outer`}>
				<div style={{background: 'lightpink'}}> Joel Holmberg 2021 : joelmholmberg at gmail dot com </div>
				<div key={`${title}_inner`}>
					<DeepZooms
						width={width}
						height={height}
						uid={uid}
						title={title}
						levels={levels}
						thumb={thumb}
						original={original}
					/>
				</div>
				<div id={`${uid}_description`} style={{background: 'lightpink'}}>
					{description}
				</div>
			</div>
		)
	}
	return(
		<div>
			here
		</div>
	)
}
export default RoutedImage


