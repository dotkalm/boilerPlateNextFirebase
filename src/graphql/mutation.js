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
import { checkShop, redirect, install } from '../server/shopify'

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
					return checkShop(parent, args, request).then(merchant => {
						console.log(merchant)
						return merchant
					})
				}
			}
		})
	}
})
export default Mutation
