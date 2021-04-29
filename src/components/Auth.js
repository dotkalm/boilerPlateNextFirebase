import React, { useEffect, useState } from 'react'
import { openShop, oAuthCallback, exchangeSessionToken } from '../shared/shopify'
import { CheckMerchant } from '../actions/auth'
import { useRouter } from 'next/router'

const Auth = ({ children, ...props }) => {
	const router = useRouter()
	const [ user, setUser ] = useState(null)
	const [ shop, setShop ] = useState(null)

	useEffect(() => {
		if(router.query){
			const { query } = router
			if(shop === null && user === null){
				openShop(query).then(u => u !== undefined && u !== 'NOT AUTHORIZED' ? setShop(u) : shop)
			}else if(shop && !user){
				if(shop && typeof(shop) !== 'string'){
					setShop(shop.token)
					setUser(shop.claims)
				}else if(shop && typeof(shop) === 'string'){
					const oAuthRedirectUrl = shop
					router.push(oAuthRedirectUrl)
				}
			}
		}
	}, [ shop, user, router ])

	const handleClick = async e => {
		const twitter = await login(e.target.name)
	}

	if(user && user.shop){
		const childrenWithProps = React
			.Children
			.map(children, child => React
				.cloneElement(child, { user }))
		return(
			<div>
				{childrenWithProps}
			</div>
		)
	}else if(user && user.error){
		return (
			<div>
				{typeof user.admin !== 'boolean'
					? 'cant get in' 
					: user.error 
				}
			</div>
		)
	}else{
		return (
			<div>
				...loading
			</div>
		)
	}
}

export default Auth
