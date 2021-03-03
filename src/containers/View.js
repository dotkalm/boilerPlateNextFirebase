import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const DeepZooms = dynamic(() => import('../components/DeepZoom'), { ssr: false })
import { 
	PageContainer, 
	LazyContainer, 
	Header 
} from '../components/style'

const RoutedImage = ({ ui, width, height, description, uid, nextUid, title, levels, thumb, original, colors, averageColor, details }) => {
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
		const { r, g, b } = averageColor
		const averageInverse = {
			r: Math.abs(255 - r),
			g: Math.abs(255 - g),
			b: Math.abs(255 - b),
		}
		const avg = `rgb(${r},${g},${b})`
		const avgInverse = `rgb(${Math.abs(255 - r)},${Math.abs(255 - g)},${Math.abs(255 - b)})`
		const findFontColor = (col) => {
			const fontColor = {}
			for(const color in col){
				if(col[color] < 127.5){
					fontColor[color] = 255 
				}else{
					fontColor[color] = 0 
				}
			}
			const fontStringHead = 'rgb(' 
			const cols = Object.values(fontColor).join(', ')
			return `rgb(${cols})`
		}
		const fontColor = findFontColor(averageColor)
		const descriptionColor = findFontColor(averageInverse)
		const mapDescription = ['title', 'year', 'medium', 'size'].map((field, index) => {
			return(
				<div key={`description${field}${uid}`} style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', textAlign:'left'}}>
					<div style={{flex:6, height: '15px', lineHeight: '18px', overflow: 'auto'}}>{details[field]}</div>
				</div>
			)
		})
		return(
			<div key={`${title}_outer`} style={{textAlign:'center'}}>
				<div style={{background: avg, color: fontColor, height: '20px'  }}> <marquee>Joel Holmberg 2021 : joelmholmberg at gmail dot com </marquee> </div>
					<div key={`${title}_inner`}>
						<DeepZooms
							width={width}
							height={height}
							uid={uid}
							title={title}
							levels={levels}
							thumb={thumb}
							ui={ui}
							original={original}
						/>
					</div>
					<div id={`${uid}_description`} style={{background: avg, height: '100px', color: fontColor, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<div style={{flex: 1}}>
							<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
							 width="80px" height="80px" viewBox="0 0 495.398 495.398" style={{enableBackground:'new 0 0 495.398 495.398'}}
							>
								<g>
									<g>
										<g>
											<path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
												v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
												c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
												c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
											<path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
												c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
												c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
										</g>
									</g>
								</g>
							</svg>
						</div>
						<div style={{flex:3, display: 'flex', flexDirection: 'column'}}>
							<button style={{flex: 1}}>
								menu
							</button>
							<div style={{flex: 1, height: '10px', width: '100%'}}>
							</div>
							<Link 
								href={`/view/${nextUid}`}
							>
								<button style={{flex: 1}}>
									next
								</button>
							</Link>
						</div>
						<div style={{flex: 3, display: 'flex', height: '100%', flexDirection: 'column', background: avgInverse, color: descriptionColor}} >
							{mapDescription}
						</div>
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



