import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import GoogleMapReact from 'google-map-react';
import { findCenter } from 'shared/util/array'
import Loader from 'shared/components/Loader'

const LoaderWrapper = styled.div`
	height: 200px;
`

const MapTools = props => {
	const [ loadingState, setLoadingState ] = useState('open')
	const [ center, setCenter ] = useState({
		lat: 39.95,
		lng: -78.33
	})
	const { utility } = props
	const [ shapes, setShapes ] = useState(null)
	const [ zoom, setZoom ] = useState(11)
	useEffect(() => {
		const asyncShapes = async () => {
			const { uid, name, service, state } = props.utility
			const data = await getUtilityShapes(uid)
			const newCenter = findCenter(data)
			if(data.length > 0){
				setCenter(newCenter)
				setShapes(data.shapes)
			}else{
				setCenter(true)
			}
			return data
		}
		if(loadingState === 'open'){
			setLoadingState('loading')
			asyncShapes().then(rr => {
				setShapes(rr)
				setLoadingState('loaded')
			})
		}
	}, [ shapes, utility, center, loadingState ])
	const handleApiLoaded = (map, maps) => {
		return shapes.map(shape => {
			const utilityPolygon = new maps.Polygon({
				paths: shape,
				strokeColor: "#FF0000",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "#FF0000",
				fillOpacity: 0.35
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
		<div style={{ height: '100em', width: '100%' }}>
		{shapes 
			? 
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.GOOGLE_BROWSER_KEY }}
					defaultCenter={center}
					defaultZoom={zoom}
					yesIWantToUseGoogleMapApiInternals 
					onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
				>
				</GoogleMapReact>
			: ''
		}
		</div>
	);
}

export default MapTools

