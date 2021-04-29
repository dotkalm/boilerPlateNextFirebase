import React, { useEffect, useState } from 'react'
import { checkLogged, login, logOut, emailLogin } from '../actions/auth'
import { openShop, oAuthCallback, exchangeSessionToken } from '../shared/shopify'
import AuthHeader from './AuthHeader'
import useSWR from "swr";
import Router, { useRouter } from 'next/router'

const Auth = ({ children, ...props }) => {
	const router = useRouter()
	const [ user, setUser ] = useState(null)
	const [ shop, setShop ] = useState(null)

	useEffect(() => {
		if(router.query){
			const { query } = router
			if(!query.session){
				if(shop === null && user === null){
					openShop(query).then(u => u !== undefined ? setShop(u) : shop)
				}else if(shop && shop !== 'NOT AUTHORIZED' && !user){
					if(shop && typeof(shop) !== 'string'){
						setShop(shop.token)
						setUser(shop.claims)
					}else if(shop && typeof(shop) === 'string'){
						const oAuthRedirectUrl = shop
						console.log(shop)
						//router.push(oAuthRedirectUrl)
					}
				}
			}else{
				console.log(query.session)
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
