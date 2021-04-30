import React, { useEffect, useState } from 'react'
import { signInWithCustomClaim } from '../actions/auth'
import { openShop, oAuthCallback, exchangeSessionToken, addMerchant } from '../shared/shopify'
import { useRouter } from 'next/router'

const Auth = ({ children, ...props }) => {
	const router = useRouter()
	const [ user, setUser ] = useState(null)
	const [ shop, setShop ] = useState(null)

	const { query } = router

	useEffect(() => {
		if(query){
			console.log(shop, user)
			if(shop === null && user === null){
				openShop(query).then(u => u !== undefined && u !== 'NOT AUTHORIZED' ? setShop(u) : shop)
			}else if(shop && !shop.installed && shop.valid && !user){
				const { jwt } = shop
				if(typeof(jwt) === 'string'){
					signInWithCustomClaim(jwt).then(({ user })=> {
						console.log(user, shop.redirectUrl)
						if(user && user.uid){
							router.push(shop.redirectUrl)
						}
					})
				}
			}else if(shop && !user){
				console.log(shop)
				if(shop && typeof(shop) !== 'string'){
					setShop(shop.token)
					setUser(shop.claims)
				}
			}
		}
	}, [ shop, user, query ])

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
