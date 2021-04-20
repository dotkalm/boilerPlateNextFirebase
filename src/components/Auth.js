import React, { useEffect, useState } from 'react'
import { openShop } from '../server/shopify'
import { checkLogged, login, logOut, emailLogin } from '../actions/auth'
import AuthHeader from './AuthHeader'
import useSWR from "swr";
import { useRouter } from 'next/router'

const FirebaseAuth = ({children}) => {
	const router = useRouter()
	const [ user, setUser ] = useState(null)
	const uFunc = async () => {
		try{
			const shop = await openShop(router.asPath)
			const u = await checkLogged
			setUser(u.user.claims)
			return u.user.claims
		}catch(e){
			setUser({error: e})
			return e
		}

	}
	if(user === null){
		uFunc()
	}
	const handleClick = async e => {
		const twitter = await login(e.target.name)
	}
	if(user && (user.admin || user.guest)){
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

export default FirebaseAuth
