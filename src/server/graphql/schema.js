import * as graphql from 'graphql'
import Mutation from './mutation'
import { getDestinations } from '../actions/sail'
import { 
	FieldType,
	DestinationType,
} from './types'
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
			destinations: {
				type: DestinationType,
				description: 'a destination that has boats',
				args: {
					params: { type: FieldInput } 
				},
				resolve(parent, args, request){
					return getDestinations(args, request)
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

