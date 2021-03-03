import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { mq } from '../shared/utils/mq'
import { resize } from '../shared/utils/resize'
import { makeDivs } from '../shared/utils/makeDivs'
import LoadingImagesTiles from './loadingImagesTiles'
export const RowDiv = styled.div`
	text-align: center;
	align-items: center;
	align-content: center;
	.backwards{
		animation-duration: 12s;
		animation-name: slideOut;
		animation-fill-mode: forwards;
		@keyframes slideOut {
			to {
				transform: scale(.2);
				border-radius: 100%;
				border-width: 200%;
			}
		}
	};
	.animate{
		animation-duration: 19s;
		animation-name: slidein;
		animation-fill-mode: forwards;
		@keyframes slidein {
			from {
				transform-origin: center;
				border-width: thick;
			};
			to {
				transform-origin: center;
				transform: scale(1);
			}
		}
	};

`
const DynLazyImages = ({ 
	ui,
	image, 
	index, 
	router,
	setCurrent,
	current,
	loadedIndex, 
	setLoadedIndex, 
	loadingHook, 
	setLoadingHook 
}) => {
	const { hires, thumb, description, width, height, name, colors, uid } = image 
	const [ radiusHook, setRadiusHook ] = useState(0)
	const [ loaded, setLoaded ] = useState(false)
	const [ loadedThumb, setLoadedThumb ] = useState(false)
	const [ url, setUrl ] = useState(thumb)
	const [ value, setValue ] = useState(ui.width)
	const [ imgStyle, setImgStyle ] = useState({})
	const [ border, setBorder ] = useState('10%')
	const [ slide, setSlide ] = useState(0)
	const [ slideRule, setSlideRule ] = useState(null)
	const [ fullImgStyle, setFullImgStyle ] = useState({})
	const [ currentStyle, setCurrentStyle ] = useState('')
	const [ currentDims, setCurrentDims ] = useState({ width: true, height: true })
	const imgRefThumb = useRef()
	const imgRef = useRef()
	const style = {}

	useEffect(() => {
		if(document){
			const grid = document.querySelector(`#grid_${uid}`)
			if(grid  && currentStyle === ''){
				setCurrentStyle('loading')
				setTimeout(() => {
					setCurrentStyle('loaded')
				}, 100)
			}
		}
	}, [ currentStyle, imgStyle ])
	useEffect(() => {
		if(imgStyle.height){
			const num = parseInt(imgStyle.height.replace('px', ''))
			if(!slideRule){
				setSlideRule(true)
			}
			if(slide < num){
				const newNum = slide + 3
				setTimeout(() => {
					setSlide(newNum)
				}, 15)
			}
		}
	}, [ slide, imgStyle, slideRule, radiusHook ])
	useEffect(() => {
		if (imgRefThumb.current && imgRefThumb.current.complete) {
			if(!loadingHook[thumb]){
				setLoadedThumb(true)
				setLoadingHook({...loadingHook, [thumb]: true})
			}
		}
	}, [ imgRefThumb, loadedThumb, loadingHook, loadedIndex, index, ui, imgStyle ])

	useEffect(() => {
		if (imgRef.current && imgRef.current.complete) {
			if(!loadingHook[hires]){
				setFullImgStyle(imgStyle)
				setLoaded(true);
				setLoadingHook({...loadingHook, [hires]: true})
				imgRef.current.scrollIntoView({
					behavior: "smooth",
					block: "end"
				})
				router.push(`/?${description}`, undefined, { shallow: true })
				const newNumNum = current + 1
				setTimeout(() => {
					setCurrent(newNumNum)
				}, 3500)

			}
		}
	}, [ imgRef, loaded, loadingHook, loadedIndex, index, ui, imgStyle ]);
	
	useEffect(() => {
		if((currentDims.height !== ui.height) || (currentDims.width !== ui.width)){
			setCurrentDims(ui)
			const a1 = width
			const a2 = height
			const b1 = ui.width 
			const b2 = ui.height
			const findB1 = Math.floor((a1 * b2) / a2)
			const findB2 = Math.floor((a2 * b1) / a1)
			if(findB1 <= b1){
				setImgStyle({ height: `${b2}px`, width: `${findB1}px` })
			}
			if(findB2 <= b2){
				const b = Math.round((a1 - findB1)/2)
				setImgStyle({ height: `${findB2}px`, width: `${b1}px` })
			}
		}
	}, [ imgStyle, ui, width, height ])

	useEffect(() => {
		const w = imgStyle.width ? parseInt(imgStyle.width.replace('px','')) : 0
		const diff = ui.width - w
		const b = Math.round(diff / 2)
		if(border !== `${b}px`){
			setBorder(`${b}px`)
		}
	}, [ currentDims, ui, border, width, height, imgStyle ])
	const edges = colors.edges ? colors.edges : Object.values(colors) 
	const mapColumns = edges.map((row, i) => {
		const node = row.node ? row.node : row
		return(
			<div 
				key={`column${i}`} 
				style={{ 
					display: 'flex', 
					flex: `1 100%`, 
					flexDirection:'column', 
					transform: `translateY(-${slide}px)`,
				}}
			>
					<LoadingImagesTiles
						animate={slideRule}
						radius={radiusHook}
						column={i}
						rows={Array.isArray(node) ? node : [] }
						image={image}
					/>
			</div>
		)
	})
	return(
		<RowDiv
			transform={`translateY(${imgStyle.height})`}
		>
			<div 
				id={`grid_${uid}`}
				style={{ 
					display: 'flex', 
					position: 'absolute',
					flexDirection: 'row', 
					marginLeft: border, 
					marginRight: border,
					...imgStyle,
					
				}}
			>
				{mapColumns}
			</div>
			{loaded 
				? 
					''
				: 
					<img 
						ref={imgRefThumb}
						onLoad={() => setLoadedThumb(true)}
						src={thumb}  
						style={{
							contentVisibility: !loaded ? 'hidden' : 'visible',
							...imgStyle,
						}}
					/> 
			}
			<img
				alt={description}
				src={hires}
				ref={imgRef}
				onLoad={() => setLoaded(true)}
				style={{
					contentVisibility: loaded ? 'visible' : 'hidden',
					...imgStyle,
				}}
			/>	
		</RowDiv>
	)
}

export default DynLazyImages



