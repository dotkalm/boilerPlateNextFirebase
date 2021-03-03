import React, { useEffect, useState } from 'react'
import App from '../components/App'
import Image from 'next/image'
import styled from 'styled-components'
import { removeUndefined } from '../shared/utils/removeUndefined'
import { query } from '../actions/storage'
import { getCollection } from '../server/firebaseNode'
import ImagesComponent from '../components/images' 
import Mobile from '../components/mobile' 
import { useRouter } from 'next/router'
import MobileDetect from 'mobile-detect'

const Home = ({ artwork, userAgent }) => {
	const router = useRouter()
	const md = new MobileDetect(userAgent)
	const isMobile = md.mobile()
	const viewData = artwork || []
  return (
    <App>
			hi
		</App>
  )
}

export const getStaticProps = async ({ req }) => {
	let userAgent
	if (req) { 
		userAgent = req.headers['user-agent'] 
	}
	const artwork = await getCollection('documentation')
	const obj = { artwork, userAgent } 
	removeUndefined(obj)
	return { props: { ...obj } }
}

export default Home
