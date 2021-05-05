import * as graphql from 'graphql'
import Mutation from './mutation'
import { 
	documentationConnection, 
	nodeField, 
	storageLinkType, 
	SingleView, 
	PredictionConnection,
	AddressResults,
	CountyType,
	ShopType,
	ShopSession,
	ValidateHmacType,
} from './types'
import { initFunction } 
import { 
	SessionInput,
	VerifyHmacInput,
} from './inputTypes'
import {
	mutationWithClientMutationId,
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	nodeDefinitions,
	globalIdField,
	fromGlobalId
} from 'graphql-relay'

const {
	GraphQLBoolean,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLID,
	GraphQLObjectType,
	GraphQLFloat,
	GraphQLList,
} = graphql
let db

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: (args, request) => {
		return {
			field: {
				type: FieldType,
				description: 'generic input ',
				args: {
					params: { type: FieldInput } 
				},
				resolve(parent, args, request){
					return initFunction(args, request)
				}
			},
			node: nodeField,
		}
	}
})

const Schema = new graphql.GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})
export default Schema

