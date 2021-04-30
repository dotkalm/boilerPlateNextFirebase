import * as graphql from "graphql"
import {
	addShopType,
	SessionInput,
} from './inputTypes'
import { 
	ShopType,
	ShopSession
} from './types'
const {
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLID,
	GraphQLObjectType,
	GraphQLFloat,
	GraphQLList,
	GraphQLBoolean,
} = graphql
import { 
	oAuthExchange, 
} from '../server/shopify'

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: (args, request) => {
		return ({
			requestJwt: {
				type: ShopSession,
				description: 'a merchant session',
				args: {
					session: { type: SessionInput }
				},
				resolve(parent, args, request){
					if(args.session){
						return retrieveJwt(args.session, request).then(object => {
							console.log(object, 31)
							return object
						})
					}
				}
			},
			addStore: {
				type: ShopType,
				description: 'a shop',
				args: {
					shop: { type: addShopType }
				},
				resolve(parent, args, request){
					if(args.shop && args.shop.state){
						return oAuthExchange(args.shop, request).then(object => {
							console.log(object, 31)
							return object
						})
					}
				}
			}
		})
	}
})
export default Mutation
