import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react';
import FindCenter from '../shared/utils/findCenter'
import { LoaderWrapper } from './style'
import Loader from './Loader'
import geometry from './trashfile'
const MapTools = props => {
	const [ loadingState, setLoadingState ] = useState('open')
	const [ paths, setPaths ] = useState([])
	const [ center, setCenter ] = useState({ lat: 34.121833, lng: -118.85473})
	const [ zoom, setZoom ] = useState(20)
	const [ ready, setReady ] = useState(false)
	const [ divRef, setDivRef ] = useState(useRef(null))


	const lookRecurse = node => {
		const { childNodes } = node
		const element = childNodes.item(0)
		if(element){
			childNodes.forEach(child => {
				const children = lookRecurse(child)
				const attr = child.attributes
				if(attr != undefined){
					for(let i = 0; i<attr.length; i++){
						const { name, value } = attr[i]
						if(value == 'dismissButton'){
							console.log(name, value, typeof(value), child)
							child.click()
						}
					}
				}
			})
		}
	}


	useEffect(() => {
		if(paths.length === 0){
			setPaths(geometry)
			setLoadingState('loaded')
		}
	}, [ paths, props.paths, center, zoom, loadingState ])

	useEffect(() => {
		if (loadingState == 'loaded' ){
			const callback = () => {
				const { current } = divRef
				lookRecurse(current)
			}
			setTimeout(callback, 2000)
		}
	}, [ loadingState, divRef ])

	const amount = 26
	const handleApiLoaded = (map, maps) => {
		return paths.map((path, index) => {
			let r = amount * index
			let g = 255 - (amount * index)
			let b = amount * index 
			const rgb = [r,g,b]
			for(let i = 0; i<3; i++){
				if(rgb[i] < 0){
					rgb[i] = Math.abs(rgb[i])
				}
				if(rgb[i] > 255){
					rgb[i] = rgb[i] % 255
				}
			}
			const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
			const utilityPolygon = new maps.Polyline({
				path,
				strokeColor: color,
				strokeOpacity: 1,
				strokeWeight: 8
			})
			utilityPolygon.setMap(map)
		})
	}
	if(loadingState !== 'loaded'){
		return(
			<LoaderWrapper>
				<Loader />
			</LoaderWrapper>
		)
	}
	return (
		<div style={{ height: '100em', width: '100%' }}
			ref={divRef}
		>
			<GoogleMapReact
				bootstrapURLKeys={{ key: '' }}
				defaultCenter={center}
				defaultZoom={zoom}
				yesIWantToUseGoogleMapApiInternals 
				onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
			>
			</GoogleMapReact>
		</div>
	);
}

export default MapTools

