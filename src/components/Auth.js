import React, { useEffect, useState } from 'react'
import { checkLogged, login, logOut, emailLogin } from '../actions/auth'
import { openShop, oAuthCallback } from '../shared/shopify'
import AuthHeader from './AuthHeader'
import useSWR from "swr";
import Router, { useRouter } from 'next/router'

const Auth = ({ children, ...props }) => {
	const router = useRouter()
	const [ user, setUser ] = useState(null)
	const [ shop, setShop ] = useState(null)
	const uFunc = async () => {
		try{
			const u = await checkLogged
			if(u.user.claims){
				setUser(u.user.claims)
			}
			return u.user.claims
		}catch(e){
			setUser({error: e})
			return e
		}

	}
	console.log(props)
	useEffect(() => {
		if(router.query){
			const { query } = router
			if(shop === null && !query.jwt){
				openShop(query).then(u => u !== undefined ? setShop(u) : shop)
			}else if(!query.jwt && user === null){
				const oAuthRedirectUrl = shop
				console.log(props, oAuthRedirectUrl, 34)
				router.push(oAuthRedirectUrl)
			}else{
				console.log(props, router)
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
