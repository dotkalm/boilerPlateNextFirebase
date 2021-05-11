import * as graphql from 'graphql'
import { 
	fromGlobalId, 
	globalIdField, 
	nodeDefinitions 
} from './node'
const {
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLID,
} = graphql

import { connectionDefinitions } from './connection'

export const { nodeField, nodeInterface } = nodeDefinitions(
  globalId => {
		console.log(globalId)
		return globalId
  },
)
export const RegionType = new GraphQLObjectType({
	name: 'Region',
	interfaces: [ nodeInterface ],
	description: 'region of the world',
	fields: () => ({
		id: globalIdField(),
		apiServiceId: { type: GraphQLID },
		name: { type: GraphQLString },
		apiService: { type: GraphQLString },
	})
})
export const CountryType = new GraphQLObjectType({
	name: 'Country',
	interfaces: [ nodeInterface ],
	description: 'country of vessel',
	fields: () => ({
		id: globalIdField(),
		name : { type: GraphQLString },
		apiServiceId: { type: GraphQLID },
		apiService: { type: GraphQLString },
	})
})
export const BaseType = new GraphQLObjectType({
	name: 'Base',
	interfaces: [ nodeInterface ],
	description: 'base of vessel',
	fields: () => ({
		id: globalIdField(),
		name : { type: GraphQLString },
		apiServiceId: { type: GraphQLID },
		apiService: { type: GraphQLString },
	})
})
export const MarinaType = new GraphQLObjectType({
	name: 'Marina',
	interfaces: [ nodeInterface ],
	description: 'marina of vessel',
	fields: () => ({
		id: globalIdField(),
		name : { type: GraphQLString },
		apiServiceId: { type: GraphQLID },
		apiService: { type: GraphQLString },
	})
})

export const FieldType = new GraphQLObjectType({
	name: 'aReturnField',
	description: 'yourbasic return',
	fields: () => ({
		name : { type: GraphQLString },
	})
})

export const { connectionType: DestinationConnection } = connectionDefinitions({
	nodeType: RegionType
})

