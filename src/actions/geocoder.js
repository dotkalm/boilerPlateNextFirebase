import { getIdToken } from './auth'
import unpack from '../shared/utils/unpack'
import { predictionFragment } from './fragments'
import { defaultOptions, queryParams, getRequest } from './request'

let backendUrl = process.env.GRAPHQL_SERVER
export const geocoderQuery = async ({ type, params }) => {
	let args = ''
	const argsArray = [] 
	for(const key in params){
		if(key === 'quantity'){
			argsArray.push(`${key}: ${params[key]}`)
		}else{
			argsArray.push(`${key}: "${params[key]}"`)
		}
	}
	console.log(argsArray)
	if(argsArray.length == 2 && type === 'address'){
		args = `(${argsArray.join(' ')})`
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

