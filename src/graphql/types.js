import * as graphql from 'graphql'
const {
	GraphQLString,
	GraphQLObjectType,
} = graphql

export const FieldType = new GraphQLObjectType({
	name: 'aReturnField',
	description: 'yourbasic return',
	fields: () => ({
		name : { type: GraphQLString },
	})
})
