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
import { parseColorArray } from '../server/color' 
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
	},
)
export const storageLinkType = new GraphQLObjectType({
	name: 'EmailAddress',
	description: 'email address',
	fields: () => ({
		emailArchive: { 
			type: GraphQLString,
			resolve: urlArray => {
				console.log(urlArray, 34)
				const [ url ] = urlArray
				return url
			}
		},
	})
})
export const ColorType = new GraphQLObjectType({
	name: 'Color',
	description: 'average color for asset',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		r: { type: GraphQLInt },
		g: { type: GraphQLInt },
		b: { type: GraphQLInt },
	})
})
export const ColumnType = new GraphQLObjectType({
	name: 'ColumnType',
	description: 'column view for loading',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		column: { 
			type: ColorConnection,
			resolve: (colors, args) => {
				return connectionFromArray(colors, args)
			}
		},
	})
})
export const AddressResults = new GraphQLObjectType({
	name: 'AddressResults',
	description: 'address predictions from fuzzy search with compute time',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		predictions: {
			type: PredictionConnection,
			resolve: ({ predictions }, args) => {
				return connectionFromArray(predictions, args)
			}
		},
		executionMs: { 
			type: GraphQLFloat,
			resolve: ({ executionMs }, args) => executionMs[1] / 1000000 
		},
	})
})
export const SingleView = new GraphQLObjectType({
	name: 'SingleView',
	description: 'view for deep zoom',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		colors: { 
			type: ColumnConnection,
			resolve: ({colors}, args) => {
				return connectionFromArray(Object.values(colors), args)
			}
		},
		averageColor: { 
			type: ColorType,
			resolve: asset => {
				return asset.average_color 
			}
		},
		medium: { type: GraphQLString },
		description: { type: GraphQLString },
		height: { type: GraphQLInt },
		width: { type: GraphQLInt, },
		timestamp: { type: GraphQLInt },
		levels: { type: GraphQLInt },
		hires: { type: GraphQLString },
		original: { type: GraphQLString },
		thumb: { type: GraphQLString },
		title: { type: GraphQLString },
		uid: { type: GraphQLString, },
	})
})
export const documentationType = new GraphQLObjectType({
	name: 'DocumentationType',
	description: 'artwork documentation',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		SingleView: { 
			type: SingleView,
			resolve: asset => {
				console.log(asset, 107)
				return asset
			}
		}
	})
})
export const PredictionType = new GraphQLObjectType({
	name: 'Prediction',
	description: 'geocoded address suggestions',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		rating: { type: GraphQLInt },
		stno: { type: GraphQLInt },
		street: { type: GraphQLString },
		styp: { type: GraphQLString },
		city: { type: GraphQLString },
		st: { type: GraphQLString },
		zip: { type: GraphQLString },
		country: { type: GraphQLString },
	})
})
export const { connectionType: PredictionConnection } = connectionDefinitions({
	nodeType: PredictionType,
})
export const { connectionType: ColumnConnection } = connectionDefinitions({
	nodeType: ColumnType,
})
export const { connectionType: ColorConnection } = connectionDefinitions({
	nodeType: ColorType,
})
export const { connectionType: documentationConnection } = connectionDefinitions({
	nodeType: SingleView,
})
