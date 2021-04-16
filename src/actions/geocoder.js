import { getIdToken } from './auth'
import unpack from '../shared/utils/unpack'
import { predictionFragment } from './fragments'
import { defaultOptions, queryParams, getRequest } from './request'
import prepareArgs from '../shared/utils/prepareArgs'

let backendUrl = process.env.GRAPHQL_SERVER
export const geocoderQuery = async ({ type, params }) => {
	const args = prepareArgs(params)
	if(args != ' ' && type === 'address'){
		console.log(args)
		const queryString = `
			{
				${type}${args}{
					executionMs
					predictions {
						...PredictionFragment
					}
				}
			}
			${predictionFragment}
		`
		if(window && window.location && window.location.origin === process.env.GRAPHQL_LOCAL_SERVER){
			backendUrl = process.env.GRAPHQL_LOCAL_SERVER
		}
		const idToken = await getIdToken()
		const request = getRequest(idToken, queryString)
		const f = await fetch(`${backendUrl}/api/graphql`, request)
		const rr = await f.json()
		console.log(rr)
		if(rr && rr.data && rr.data.address){
			const { executionMs, predictions } = rr.data.address
			return { executionMs, predictions: unpack(predictions) }
		}else{
			return rr
		}
	}
}

