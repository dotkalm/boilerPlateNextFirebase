import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import OpenSeaDragon from 'openseadragon'

const DeepZooms = ({ ui, width, height, uid, title, levels }) => {
	const [ loaded, setLoaded ] = useState(false)
	useEffect(() => {
		const prefixUrl = process.env.PREFIX_URL 
		console.log(prefixUrl)
		const buck = `${process.env.ZOOM_BUCKET_URL}/${uid}/`
		if(window){
			const { document } = window
			if(!loaded && document){
				setLoaded(true)
				OpenSeaDragon({
					id: "zoom",
					inactiveDuration: 1000,
					debugMode: false,
					showNavigationControl: true,
					immediateRender: false,
					blendTime: 0.0,
					animationTime: 1.5,
					springStiffness: 15.0,
					maxZoomPixelRatio: 1.0,
					minZoomImageRatio: .9,
					zoomPerClick: 2,
					zoomPerScroll: 1.1,
					constrainDuringPan: true,
					visibilityRatio: 1,
					prefixUrl: '../ui_images/',
					tileSources: {
						Image: {
							Url: buck,
							xmlns: "http://schemas.microsoft.com/deepzoom/2008",
							Format: "jpg",
							TileSize: 512,
							Overlap: 0,
							minLevel: levels,
							Size: {
								Width: width,
								Height: height
							},
						},
					}
				})
			}
		}
	}, [ loaded, height, uid, levels, width ])

	if(ui.width){
		return(
			<div 
				style={{
					width: `${ui.width}px`, 
					height: `${ui.height}px`,
					display: 'flex'
				}}
			>
				<div id='zoom' style={{
					flex: 1,
					width: '100%',
				}}>
				</div>
			</div>
		)
	}
	return(
		<div> loading</div>
	)
}
export default DeepZooms

