import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react';
import FindCenter from '../shared/utils/findCenter'
import { LoaderWrapper } from './style'
import Loader from './Loader'
import { fetchBoundary } from '../actions/boundaries'
const MapTools = props => {
	const { height, width } = props.ui

	const [ loadingState, setLoadingState ] = useState('open')
	const [ paths, setPaths ] = useState([])
	const [ center, setCenter ] = useState(null)
	const [ zoom, setZoom ] = useState(10)
	const [ ready, setReady ] = useState(false)
	const [ divRef, setDivRef ] = useState(useRef(null))
	const [ boundaries, setBoundaries ] = useState(true)
	const [ fetchingState, setFetchingState ] = useState(null)

	useEffect(() => {
		if(boundaries === null && fetchingState == null){
			setFetchingState('fetching')
			const county = 'Los Angeles'
			const state = 'California'
			fetchBoundary({ type: 'County', params: { county, state } })
				.then(geom => {
					const { intptlat, intptlon, the_geom } = geom
					setCenter({lat: intptlat, lng: intptlon})
					setFetchingState('done')
					const { edges } = the_geom
					for(let i = 0; i < edges.length; i++){
						const { node } = edges[i]
						edges[i] = node
					}
					setPaths([edges])
				})
		}
	}, [ boundaries, fetchingState, center ])
	const findDismissButton = node => {
		const { childNodes } = node
		const element = childNodes.item(0)
		if(element){
			childNodes.forEach(child => {
				const children = findDismissButton(child)
				const attr = child.attributes
				if(attr != undefined){
					for(let i = 0; i<attr.length; i++){
						const { name, value } = attr[i]
						if(name == 'src' && value.includes('https://maps.googleapis.com/maps/') && value.includes('styles!')){
							child.setAttribute(name, value.replace(/styles!.*/, 'styles!'))
						}
						if(value == 'dismissButton'){
							child.click()
						}
					}
				}
			})
		}
	}

	const callback = () => {
		const { current } = divRef
		findDismissButton(current)
	}

	useEffect(() => {
		if(fetchingState == 'done'){
			if(paths.length === 0){
				console.log(center)
				setLoadingState('loaded')
			}
		}
	}, [ fetchingState, paths, props.paths, zoom, loadingState ])

	useEffect(() => {
		if (loadingState == 'loaded' && fetchingState == 'done'){
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
					strokeWeight: 2
				})
				utilityPolygon.setMap(map)
		})
	}
	if(loadingState !== 'loaded' && fetchingState == 'done'){
		return(
			<LoaderWrapper>
				<Loader />
			</LoaderWrapper>
		)
	}
	const traverseDom = () => {
		setTimeout(callback, 2000)
	}

	return (
		<div style={{ height: `${height - 300}px`, width: '95%', margin: '2.5%' }}
			ref={divRef}
			onDrag={traverseDom}
			onDragEnd={traverseDom}
			onClick={traverseDom}
			onWheel={traverseDom}
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

