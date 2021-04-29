import Router from 'next/router'
import { validateHmac } from '../graphql/client'
import { getRequest } from './request'

export const checkMerchant = async query => {
	if(query){
		const gql = validateHmac(query)
		console.log(gql)
		const request = getRequest(null, gql)
		const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
		const rr = f.json()
		if(rr.data && rr.data.ValidateHmac){
			console.log(rr.data)
			return rr
		}
	}
}
