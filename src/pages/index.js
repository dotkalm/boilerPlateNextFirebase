import React, { useEffect, useState } from 'react'
import App from '../components/App'
import Auth from '../components/Auth'

const Home = ({ userAgent, auth }) => {
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
				BOILERPLATE
			</App>
		</Auth>
  )
}

export const getStaticProps = async ({ req }) => {
	const userAgent = req.headers.userAgent
	return { props: { userAgent: userAgent ? userAgent : '' } }
}

export default Home
