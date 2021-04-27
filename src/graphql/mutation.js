import * as graphql from "graphql"
import {
	addShopType 
} from './inputTypes'
import { ShopType } from './types'
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
import { checkShop, oAuthExchange, install } from '../server/shopify'

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: (args, request) => {
		return ({
			addStore: {
				type: ShopType,
				description: 'a shop',
				args: {
					shop: { type: addShopType }
				},
				resolve(parent, args, request){
					if(args.shop && args.shop.state !== 'undefined'){
						return oAuthExchange(args.shop, request)
					}else{
						return checkShop(parent, args.shop, request)
					}
				}
			}
		})
	}
})
export default Mutation
