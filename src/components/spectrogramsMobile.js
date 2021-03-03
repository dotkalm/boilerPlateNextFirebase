import React, { useState, useEffect } from 'react'
import { 
	PageContainer, 
	LazyContainer, 
	Header 
} from './style'

const SpectrogramsMobile = ({ images }) => {
	const [ ui, setUi ] = useState({ 
		width: true,
		height: true 
	})

	useEffect(() => {
		if(document){
			const { body } = document
			body.style.margin=`0px`
		}
		if(window 
			&& (
				ui.height === true || 
				ui.height !== window.innerHeight
			) 
			&& (
				ui.width === true || 
				ui.width !== window.innerWidth
			)
		)
		{
			setUi({	
				height: window.innerHeight, 
				width: window.innerWidth 
			})
		}
	}, [ ui ])


	console.log(ui)
	return(
		<PageContainer>
			<Header>
				Joel Holmberg 2021
			</Header>
		</PageContainer>
	)
}

export default SpectrogramsMobile 

