import * as graphql from 'graphql'
import Mutation from './mutation'
import { getDestinations } from '../actions/sail'
import { 
	FieldType,
	DestinationType,
	DestinationConnection,
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
				type: DestinationConnection,
				description: 'a destination that has countries, bases, marinas and vessels',
				args: {
					date		 : { type: GraphQLFloat },
					crew		 : { type: GraphQLBoolean }, 
					days		 : { type: GraphQLInt }, 
					geoRegion: { type: GraphQLString }, 
				},
				resolve(parent, args, request){
					return getDestinations(args, request).then(data => {
						const { sednaData, bookingManager } = data 
						return sednaData 
					})
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

