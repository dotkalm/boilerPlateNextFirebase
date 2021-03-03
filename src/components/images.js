import React, { useState, useEffect } from 'react'
import { BouncingArrow } from '../shared/utils/bouncingArrow'
import LazyImages from './lazyImages'
import { 
	PageContainer, 
	LazyContainer, 
	Header 
} from './style'

const ImagesComponent = ({ images, router }) => {
	const [ current, setCurrent ] = useState(0)
	const [ loadingHook, setLoadingHook ] = useState({})	
	const [ loadedIndex, setLoadedIndex ] = useState(0)
	const [ ui, setUi ] = useState({ width: true, height: true })
	useEffect(() => {
		if(document){
			const { body } = document
			body.style.margin=`0px`
			body.style.textAlign='center'
		}
		if(window && (ui.height !== window.innerHeight) || (ui.width !== window.innerWidth)){
			setUi({	height: window.innerHeight, width: window.innerWidth })
		}
		if(window){
			const reportWindowSize = () => {
				if((ui.height !== window.innerHeight) || (ui.width !== window.innerWidth)){
					setUi({	height: window.innerHeight, width: window.innerWidth })
				}
			}
			window.addEventListener('resize', reportWindowSize);
		}
	}, [ ui ])

	const mapImages = images.map((el,i) => {
		const e = el.node ? el.node : el
		if(e){
			return(
				<LazyContainer
					key={`lazyContainer${i}`}
				>
					<LazyImages 
						ui={ui}
						image={e}
						current={Math.floor(current)}
						router={router}
						setCurrent={setCurrent}
						index={i}
						loadingHook={loadingHook}
						setLoadingHook={setLoadingHook}
						loadedIndex={loadedIndex}
						setLoadedIndex={setLoadedIndex}
					/>
				</LazyContainer>
			)
		}
	})
	return(
		<PageContainer>
			<Header> Joel Holmberg 2021 : joelmholmberg at gmail dot com </Header>
			{images.length > 0 ? mapImages : ''}
			{images.length !== parseInt(Object.keys(loadingHook).length /2) 
				?
					<BouncingArrow
						onClick={() => setCurrent(current + 1)}
						images={images}
					/> 
				: 
					''
			}
		</PageContainer>
	)
}

export default ImagesComponent 
