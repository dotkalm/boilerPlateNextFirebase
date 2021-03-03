import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyImages from './lazyImages'
import MobileImages from './mobileImages'
const zeroMouse = {
	previous:{
		x: 0,
		y: 0
	},
	current:{
		x: 0,
		y: 0
	}
}
const Mobile = ({ images }) => {
	const [ current, setCurrent ] = useState(1)
	const [ scrollPosition, setScrollPosition ] = useState(0)
	const [ touchPosition, setTouchPosition ] = useState(zeroMouse)
	const [ mousePosition, setMousePosition ] = useState(zeroMouse)
	const [ loadingHook, setLoadingHook ] = useState(false)	
	const [ mouseDown, setMouseDown ] = useState(false)
	const [ touchWidth, setTouchWidth ] = useState(0)
	const [ distance, setDistance ] = useState({
		previous: 0,
		current: 0
	})
	const [position, setPosition] = useState({
		x: 0,
		y:0
	})

	const findDistance = (x1,y1,x2,y2) => {
		setDistance({
			previous: distance.current,
			current: Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2))
		})
	}

	const touchHandler = e => {
		if(mouseDown){
			const {clientX, clientY} = e.touches[0]
			setTouchPosition({
				previous:{
					x: touchPosition.current.x,
					y: touchPosition.current.y
				},
				current:{
					x: clientX,
					y: clientY
				}
			})
			const { previous } = touchPosition
			const curr = touchPosition.current
			if (previous.x !== 0 && previous.y !== 0){
				const xDiff = curr.x - previous.x
				const yDiff = curr.y - previous.y
				if(yDiff < 0 && !loadingHook){
					const integer = -yDiff/1.4
					setCurrent((current + (integer/100)))
				}
				setPosition({
					x: position.x + xDiff,
					y: position.y + yDiff
				})
			}
		}
	}
	const scrollHandler = e => {
	}
	const mouseUp = () => {
		setMousePosition(zeroMouse)
		setMouseDown(false)
		setTouchPosition(zeroMouse)
	}
	const mapImages = images.map((e,i) => {
		return(
			<div key={`container${i}lazy`}
				onTouchMove={touchHandler}
				onTouchStart={() => setMouseDown(true)}
				onTouchEnd={() => mouseUp()}
			>
				<MobileImages 
					touchPosition={touchPosition}
					loadingHook={loadingHook}
					setLoadingHook={setLoadingHook}
					index={i}
					current={Math.floor(current)}
					setCurrent={setCurrent}
					image={e}
				/>
			</div>
		)
	})
	return(
		<main 
			onWheel={scrollHandler}
			ref={el => {
				if(!el){
					return
				}else{
					const body = document.body.getBoundingClientRect()
					const main = el.getBoundingClientRect()
				}
			}}
			onTouchStart={() => setMouseDown(true)}
			onTouchEnd={() => mouseUp()}
		>
			{mapImages}
		</main>
	)
}

export default Mobile 

