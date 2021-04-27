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
					console.log(args)
					if(args.shop && args.shop.state){
						return oAuthExchange(args.shop, request).then(object => {
							console.log(object, 31)
							return object
						})
					}else{
						console.log(args.shop, 35)
						return checkShop(parent, args.shop, request)
					}
				}
			}
		})
	}
})
export default Mutation
