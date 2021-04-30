import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import { checkLogged } from '../../shared/auth'
import { oAuthCallback } from '../../shared/shopify'

const InstallFlow = props => {
	const { router } = props
	const [ store, setStore ] = useState(null)
	useEffect(() => {
		if(store === null){
			oAuthCallback(router.query).then(s => s !== undefined ? setStore(s) : s)
		}else{
			console.log(store)
			//router.push(`${process.env.SSL_PREFIX}${store.shop.claims.shop}${process.env.SHOPIFY_ADMIN_SUFFIX}`)
		}
	}, store)
  return (
		<div>
			...installing	
		</div>
  )
}
export default withRouter(InstallFlow)

