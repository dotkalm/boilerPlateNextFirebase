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
} from './types'
import { SessionInput } from './inputTypes'
import { decodeSession } from '../server/shopify'
import { geocode, getCounty } from '../server/geocode'
import { queryLocal } from '../server/sqlite'
import { time } from '../server/time'
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
						return parentValue.db().connect().then(client => {
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
			time: {
				type: GraphQLString,
				resolve: (parentValue, args, r) => {
					const start = process.hrtime() 
					if(db !== undefined){
						console.log(args, 'db running')
						return time(args, request, db).then(array => {
							const [ time ] = array
							return time.now 
						})
					}else{
						console.log(args, 'startDb')
						return parentValue.db().connect().then(client => {
							console.log('db started')
							db = client
							return time(args, request, client).then(array => {
								const [ time ] = array
								return time.now 
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
			County: {
				type: CountyType,
				args: {
					county: {
						description: 'county',
						type: new GraphQLNonNull(GraphQLString),
					}, 	
					state: {
						description: 'state',
						type: new GraphQLNonNull(GraphQLString),
					},
				},
				resolve: (parentValue, args, r) => {
					console.log(args, r.headers.Authorization)
					return getCounty(args)
				}
			},
			ShopSession: {
				type: ShopSession,
				description: 'authenticate shop from session token',
				args: {
					session: { type: SessionInput } 
				},
				resolve(parent, args, request){
					return decodeSession(parent, args.session, request).then(r => {
						console.log(r)
						return r
					})
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
	mutation: Mutation,
})
export default Schema

