import React, { useEffect, useState } from 'react'
import { openShop, oAuthCallback, exchangeSessionToken } from '../shared/shopify'
import AuthHeader from './AuthHeader'
import { useRouter } from 'next/router'

const Auth = ({ children, ...props }) => {
	const router = useRouter()
	const [ user, setUser ] = useState(null)
	const [ shop, setShop ] = useState(null)

	useEffect(() => {
		if(router.query){
			const { query } = router
			if(!query.session){
				if(shop === null && user === null){
					console.log(query)
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
			}else{
				if(query.session){
					exchangeSessionToken(query).then(s => s !== undefined ? (() => {
						console.log(s)
						setShop(s.token)
						setUser(s.claims)
					}) : s)
				}
			}
		}
	}, [ shop, user, router ])

	const handleClick = async e => {
		const twitter = await login(e.target.name)
	}

	if(user && (user.admin || user.guest || user.shop)){
		const childrenWithProps = React
			.Children
			.map(children, child => React
				.cloneElement(child, { user }))
		return(
			<div>
				<AuthHeader logout={logOut}/>
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
