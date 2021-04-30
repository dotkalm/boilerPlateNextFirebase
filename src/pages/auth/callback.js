import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import { oAuthCallback } from '../../shared/shopify'

const InstallFlow = ({ router }) => {

	const [ store, setStore ] = useState(null)

	useEffect(() => {
		if(store === null){
			oAuthCallback(router.query).then(s => s !== undefined ? setStore(s) : s)
		}
		if(store && store.name){
			router.push(`${process.env.SSL_PREFIX}${store.name}${process.env.SHOPIFY_ADMIN_SUFFIX}`)
		}
	}, [ store, router ])
  return (
		<div>
			...installing	
		</div>
  )
}
export default withRouter(InstallFlow)

