import * as graphql from 'graphql'
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
export const FieldInput = new GraphQLInputObjectType({ 
	name: 'basicFieldInput',
	fields: () => ({
		name: { type: GraphQLString }
	})
})
