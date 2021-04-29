import Router from 'next/router'
import { validateHmac } from '../graphql/client'
import { getRequest } from './request'

export const checkMerchant = async ({ name, shop, timestamp, hmac }) => {
	try{
		if(hmac){
			const query = {
				shop,
				timestamp,
				hmac
			}
			const gql = validateHmac(query)
			const request = getRequest(null, gql)
			const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
			const rr = f.json()
			return rr
		}
	}catch(err){
		console.log(err)
		return err
	}
}
