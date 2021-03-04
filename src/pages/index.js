import React, { useEffect, useState } from 'react'
import App from '../components/App'
import Auth from '../components/Auth'
import Tiger from '../components/Tiger' 
import removeUndefined from '../shared/utils/removeUndefined'
const Home = ({ userAgent }) => {
  return (
		<Auth>
			<App>
				<Tiger/>
			</App>
		</Auth>
  )
}

export const getStaticProps = async ({ req }) => {
	let userAgent
	if(req){ 
		userAgent = req.headers['user-agent'] 
	}
	const obj = { userAgent } 
	removeUndefined(obj)
	return { props: { ...obj } }
}

export default Home
