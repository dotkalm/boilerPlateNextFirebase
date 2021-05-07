import * as graphql from 'graphql'
import Mutation from './mutation'
import { 
	FieldType,
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
			field: {
				type: FieldType,
				description: 'generic input ',
				args: {
					params: { type: FieldInput } 
				},
				resolve(parent, args, request){
					return {} 
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

