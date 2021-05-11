import * as graphql from 'graphql'
import Mutation from './mutation'
import { getDestinations } from '../actions/sail'
import { 
	FieldType,
	RegionConnection,
	CountryConnection,
	BaseConnection,
	MarinaConnection,
} from './types'
import { 
	connectionFromArray,
} from './connection'
import {
	FieldInput,
} from './inputTypes'
const {
	GraphQLBoolean,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLID,
	GraphQLObjectType,
	GraphQLFloat,
	GraphQLList,
	GraphQLInputObjectType,
} = graphql

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: (args, request) => {
		return {
			regions: {
				type: RegionConnection,
				description: 'a region that has vessels',
				args: {
					date		 : { type: GraphQLFloat },
					crew		 : { type: GraphQLBoolean }, 
					length	 : { type: GraphQLInt }, 
					region   : { type: GraphQLString }, 
					first		 : { type: GraphQLInt }, 
					last		 : { type: GraphQLInt }, 
				},
				resolve(parent, args, request){
					console.log(args)
					return connectionFromArray([{name: 'me'}], args)
				}
			},
			countries: {
				type: CountryConnection,
				description: 'a country that has vessels',
				args: {
					date		 : { type: GraphQLFloat },
					crew		 : { type: GraphQLBoolean }, 
					length	 : { type: GraphQLInt }, 
					region   : { type: GraphQLString }, 
					first		 : { type: GraphQLInt }, 
					last		 : { type: GraphQLInt }, 
				},
				resolve(parent, args, request){
					console.log(args)
					return connectionFromArray([{name: 'me'}], args)
				}
			},
			bases: {
				type: BaseConnection,
				description: 'a base that has vessels',
				args: {
					date		 : { type: GraphQLFloat },
					crew		 : { type: GraphQLBoolean }, 
					length	 : { type: GraphQLInt }, 
					region   : { type: GraphQLString }, 
					country  : { type: GraphQLString }, 
					first		 : { type: GraphQLInt }, 
					last		 : { type: GraphQLInt }, 
				},
				resolve(parent, args, request){
					console.log(args)
					return connectionFromArray([{name: 'me'}], args)
				}
			},
			marinas: {
				type: MarinaConnection,
				description: 'a base that has vessels',
				args: {
					date		 : { type: GraphQLFloat },
					crew		 : { type: GraphQLBoolean }, 
					length	 : { type: GraphQLInt }, 
					region   : { type: GraphQLString }, 
					country  : { type: GraphQLString }, 
					base 		 : { type: GraphQLString }, 
					first		 : { type: GraphQLInt }, 
					last		 : { type: GraphQLInt }, 
				},
				resolve(parent, args, request){
					console.log(args)
					return connectionFromArray([{name: 'me'}], args)
				}
			},
		}
	}
})

const Schema = new graphql.GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})
export default Schema

