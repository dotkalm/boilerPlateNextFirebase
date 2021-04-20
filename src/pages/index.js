import React, { useEffect, useState } from 'react'
import App from '../components/App'
import Auth from '../components/Auth'
import Tiger from '../components/Tiger' 
import removeUndefined from '../shared/utils/removeUndefined'

const Home = ({ userAgent }) => {
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
  return (
		<Auth>
			<App>
				<Tiger
					ui={ui}
				/>
			</App>
		</Auth>
  )
}

export const getStaticProps = async ({ req }) => {
	let userAgent
	if(req){
		console.log(req, 41)
	}
	const obj = { userAgent } 
	removeUndefined(obj)
	return { props: { ...obj } }
}

export default Home
