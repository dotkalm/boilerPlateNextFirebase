import * as graphql from 'graphql'
const {
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
} = graphql

export const FieldType = new GraphQLObjectType({
	name: 'aReturnField',
	description: 'yourbasic return',
	fields: () => ({
		name : { type: GraphQLString },
	})
})
export const DestinationType = new GraphQLObjectType({
	name: 'destination',
	description: 'returns destinations',
	fields: () => ({
		destinationId: { type: GraphQLString },
		name : { type: GraphQLString }
	})
})
