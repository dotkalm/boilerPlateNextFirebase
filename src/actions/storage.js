import { getIdToken } from './auth'
import { singleViewFragment } from './fragments'
import { defaultOptions, queryParams, getRequest } from './request'
const apiKey = process.env.GOOGLE_APIKEY
const bucket = process.env.CLIENT_EMAIL_BUCKET

export const query = async ({ type, params }) => {
	let args = ''
	for(const key in params){
		args = `${key}: "${params[key]}"`
	}
	if(args !== '' && type === 'singleView'){
		args = `(${args})`
		const queryString = `
			{
				${type}${args}{
				...SingleView
				}
			}
			${singleViewFragment}
		`
		const request = getRequest(null, queryString)
		const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
		const rr = await f.json()
		if(rr && rr.data && rr.data.singleView){
			const a = rr.data.singleView 
			return a 
		}else{
			return rr
		}
	}
	if(type === 'documentation'){
		const queryString = `
			{
				${type}{
					edges{
						node{
						...SingleView
						}
					}
				}
			}
			${singleViewFragment}
		`
		const request = getRequest(null, queryString)
		const f = await fetch(`${process.env.GRAPHQL_SERVER}/api/graphql`, request)
		const rr = await f.json()
		if(rr && rr.data && rr.data.documentation && rr.data.documentation.edges){
			const a = rr.data.documentation.edges
			return a 
		}else{
			return rr
		}
	}
}
