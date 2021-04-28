import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import App from '../../components/App'
import { oAuthCallback } from '../../shared/shopify'

const InstallFlow = props => {
	const { router } = props
	const [ store, setStore ] = useState(null)
	useEffect(() => {
		if(store === null){
			oAuthCallback(router.query).then(s => router.push('../../', s))
		}
	}, store)
  return (
		<div>
			...installing	
		</div>
  )
}
export default withRouter(InstallFlow)
