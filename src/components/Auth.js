import React, { useEffect, useState } from 'react'
import { checkLogged, login, logOut, emailLogin } from '../actions/auth'
import { openShop } from '../shared/shopify'
import AuthHeader from './AuthHeader'
import useSWR from "swr";
import Router, { useRouter } from 'next/router'

const FirebaseAuth = ({ children }) => {
	const router = useRouter()
	const [ user, setUser ] = useState(null)
	const [ shop, setShop ] = useState(null)
	const uFunc = async () => {
		try{
			const u = await checkLogged
			console.log(u, 15)
			if(u.user.claims){
				setUser(u.user.claims)
			}
			return u.user.claims
		}catch(e){
			setUser({error: e})
			return e
		}

	}
	if(shop === null){
		openShop()
		//here we should have session tokens 
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
