import React, { useEffect, useState } from 'react'
import { signInWithJwt } from '../actions/auth'
import { openShop } from '../shared/shopify'
import { useRouter } from 'next/router'

const Auth = ({ children, ...props }) => {
	const router = useRouter()
	const [ user, setUser ] = useState(null)
	const [ shop, setShop ] = useState(null)

	const { query } = router
	useEffect(() => {
		console.log(shop, user, query)
		if(query){
			if(shop === null && user === null){
				openShop(query).then(u => u !== undefined && u !== 'NOT AUTHORIZED' ? setShop(u) : shop)
			}else if(shop && !shop.installed && shop.valid && !user){
				const { redirectUrl } = shop
				const url = new RegExp(`^https://${query.shop}`)
				if(redirectUrl.match(url)){
					setUser({displayName: query.shop})
				}
				console.log(shop)
			}else if(shop && shop.jwt && !user){
				const { jwt } = shop
				signInWithJwt(jwt).then(u => setUser(u))
			}
		}
	}, [ shop, user, query ])

	if(user && query && shop){
		if(!user.uid && user.displayName === query.shop && shop.valid && !shop.installed){
			router.push(shop.redirectUrl)
		}
	}
	if(user && user.shop && user.refreshToken){
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
