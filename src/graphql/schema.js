import * as graphql from 'graphql'
import { 
	documentationConnection, 
	nodeField, 
	storageLinkType, 
	SingleView, 
	PredictionConnection,
	AddressResults,
} from './types'
import { geocode } from '../server/geocode'
import { getDoc, getCollection } from '../server/firebaseNode'
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
			address: {
				type: AddressResults,
				args: {
					address: {
						description: 'address query for fuzzy search',
						type: new GraphQLNonNull(GraphQLString),
					},
					quantity: {
						description: 'max number of results to be fetched',
						type: new GraphQLNonNull(GraphQLInt),
					},
				},
				resolve: (parentValue, args, request) => {
					const start = process.hrtime() 
					if(db !== undefined){
						console.log(args, 'db running')
						return geocode(args, request, db).then(array => {
							return {
								predictions: array,
								executionMs: process.hrtime(start)
							}
						})
					}else{
						console.log(args, 'startDb')
						return parentValue.db().connect().then(client => {
							console.log('db started')
							db = client
							return geocode(args, request, client).then(array => {
								return {
									predictions: array,
									executionMs: process.hrtime(start)
								}
							})
						})
					}
				}
			},
			singleView: {
				type: SingleView,
				args: {
					uid: {
						description: 'document id',
						type: new GraphQLNonNull(GraphQLString),
					},
				},
				resolve: (parentValue, args, r) => {
					return getDoc('documentation', args.uid)
				}
			},
			documentation: {
				type: documentationConnection,
				resolve: (parentValue, args, r) => {
					return getCollection('documentation')
						.then(arr => {
							return connectionFromArray(arr, args)
						})
				}
			},
			node: nodeField,
		}
	}
})

const Schema = new graphql.GraphQLSchema({
	query: RootQuery,
})
export default Schema

