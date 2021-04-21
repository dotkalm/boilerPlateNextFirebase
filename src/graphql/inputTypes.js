import * as graphql from 'graphql'
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
	GraphQLInputObjectType,
} = graphql
export const { nodeInterface, nodeField } = nodeDefinitions(
	globalId => {
		const { type, id } = fromGlobalId(globalId)
	},
)

export const addShopType = new GraphQLInputObjectType({
	name: 'AddShopType',
	fields: () => ({
		name: { type: new GraphQLNonNull(GraphQLString) },
		timestamp: { type: new GraphQLNonNull(GraphQLInt) },
		hmac: { type: new GraphQLNonNull(GraphQLString) },
	})
})
