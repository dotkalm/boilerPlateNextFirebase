import { countyFragment } from './fragments'
import { defaultOptions, queryParams, getRequest } from './request'
import prepareArgs from '../shared/utils/prepareArgs'

let backendUrl = process.env.GRAPHQL_SERVER

export const fetchBoundary = async ({ type, params })=> {
	try{
		if(window && window.location && window.location.origin === process.env.GRAPHQL_LOCAL_SERVER){
			backendUrl = process.env.GRAPHQL_LOCAL_SERVER
		}
		const args = prepareArgs(params)
		const idToken = await getIdToken()
		const queryString = `
			{
				${type}${args}{
					...CountyFragment
				}
			}
			${countyFragment}
		`
		const request = getRequest(idToken, queryString)
		if(type == 'County'){
			const f = await fetch(`${backendUrl}/api/graphql`, request)
			const rr = await f.json()
			if(rr.data && rr.data.County){
				return rr.data.County
			}else{
				console.log(rr.data)
			}
		}
	}catch(err){
		return err
	}
} 
