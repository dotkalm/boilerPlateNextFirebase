import * as graphql from "graphql"
import {
	FieldInput,
} from './inputTypes'
import { 
	DestinationType,
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


const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: (args, request) => {
		return ({
			basic: {
				type: DestinationType,
				description: 'field',
				args: {
					session: { type: FieldInput }
				},
				resolve(parent, args, request){
					return {}
				}
			}
		})
	}
})
export default Mutation
