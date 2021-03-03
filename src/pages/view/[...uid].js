import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MobileDetect from 'mobile-detect'
import RoutedImage from '../../containers/View'
import RoutedStaticImage from '../../components/routedStaticImage'
import { query } from '../../actions/storage'
import { removeUndefined } from '../../shared/utils/removeUndefined'
import { getDoc, nextElement } from '../../server/firebaseNode'
import { 
	PageContainer, 
	LazyContainer, 
	Header 
} from '../../components/style'

const View = ({ data, userAgent, artwork, params, location, ...rest }) => {
  const router = useRouter()
	console.log(rest.nextElement)
	const { uid } = router.query
	const md = new MobileDetect(userAgent)
	const [ viewData, setViewData ] = useState({
		width: 0, 
		height: 0, 
		title: '', 
		levels: 0, 
		original: '', 
		thumb: '', 
		description: '',
	})
	const [ nextData, setNextData ] = useState(null)
	useEffect(() => {
		if(nextData){
			if(nextData.uid && nextData.uid !== rest.nextElement.uid){
				artwork.previousUid = viewData.uid
				setViewData(artwork)
				setNextData(rest.nextElement)
			}
		}
	}, [ viewData, router, uid, nextData ] )
	const [ ui, setUi ] = useState({ width: 0, height: 0 })
	useEffect(() => {
		if(router.isReady && viewData.width === 0){
			if(artwork){
				setViewData(artwork)
				setNextData(rest.nextElement)
			}
		}
	}, [ viewData, router, uid, nextData ] )
	useEffect(() => {
		if(window && window.innerHeight){
			if(ui.width !== window.innerWidth){
				setUi({
					width: window.innerWidth,
					height: window.innerHeight - 120
				})
			}
		}
	}, [ ui ])
	const isMobile = md.mobile()
	if(viewData.width > 0){
		const { width, height, uid, average_color, colors, levels, thumb, original, description, title, details} = viewData
		return(
			<PageContainer>
				<style jsx global>{`
					body {
						margin: 0px;
						padding: 0px;
					}
				`}
				</style>
				<RoutedImage
					averageColor={average_color}
					previousUid={viewData.previousUid}
					colors={colors}
					width={width}
					height={height}
					ui={ui}
					uid={uid}
					title={title}
					details={details}
					levels={levels}
					thumb={thumb}
					original={original}
					nextUid={rest.nextElement.uid}
					description={description}
				/>
			</PageContainer>
		)
	}else{
		return(
			<div>
				...loading
			</div>
		)
	}
}
export const getServerSideProps = async ({ query: { uid } }) => {
	const serverProps = {}
	const uniqueId = uid[0] 
	if(uniqueId !== "images"){
		serverProps.uid = uniqueId
		serverProps.artwork = await getDoc('documentation', uniqueId)
		serverProps.nextElement = await nextElement('documentation', uniqueId)
	}
	return {
		props: serverProps
	}
}

export default View

