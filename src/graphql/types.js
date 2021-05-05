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
} = graphql

export const { nodeInterface, nodeField } = nodeDefinitions(
	globalId => {
		const { type, id } = fromGlobalId(globalId)
	}
)
export const FieldType = new GraphQLObjectType({
	name: 'a return field',
	description: 'your basic return',
	fields: () => ({
		id: globalIdField(),
		name : { type: GraphQLString },
	})
})
export const { connectionType: FieldConnection } = connectionDefinitions({
	nodeType: FieldType,
})
