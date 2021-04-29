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
export const FeatNamesType = new GraphQLObjectType({
	name: 'FeatNames',
	description: 'feat names from us census 2020',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		gid       : { type: GraphQLInt },
		tlid      : { type: GraphQLInt },
		fullname  : { type: GraphQLString },
		name      : { type: GraphQLString },
		predirabrv: { type: GraphQLString },
		pretypabrv: { type: GraphQLString },
		prequalabr: { type: GraphQLString },
		sufdirabrv: { type: GraphQLString },
		suftypabrv: { type: GraphQLString },
		sufqualabr: { type: GraphQLString },
		predir    : { type: GraphQLString },
		pretyp    : { type: GraphQLString },
		prequal   : { type: GraphQLString },
		sufdir    : { type: GraphQLString },
		suftyp    : { type: GraphQLString },
		sufqual   : { type: GraphQLString },
		linearid  : { type: GraphQLString },
		mtfcc     : { type: GraphQLString },
		paflag    : { type: GraphQLString },
		statefp   : { type: GraphQLString },
	})
})
export const PolylineType = new GraphQLObjectType({
	name: 'Polylines',
	description: 'many points',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		lat: { type: GraphQLFloat },
		lng: { type: GraphQLFloat },
	})
})
export const CountyType = new GraphQLObjectType({
	name: 'Addr',
	description: 'addr from us census',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		statefp   : { type: GraphQLString },
		countyfp 	: { type: GraphQLString },
		intptlat  : { type: GraphQLFloat }, 
		intptlon  : { type: GraphQLFloat }, 
		the_geom	: { 
			type: PointConnection,
			resolve: ({the_geom}, args) => {
				const shape = JSON.parse(the_geom)
				const { coordinates } = shape
				const [ arr ] = coordinates[0]
				const points = Array(arr.length).fill({lat:null,lng:null})
				for(let i = 0; i < arr.length; i++){
					let { lat, lng } = points[i] 
					points[i] = { lat: arr[i][1], lng: arr[i][0] } 
				}
				return connectionFromArray(points, args)
			}
		},
	})
})
export const PointType = new GraphQLObjectType({
	name: 'PointType',
	description: 'lt and lng',
	interfaces: [nodeInterface],
	fields: () => ({
		id: globalIdField(),
		lat: { type: GraphQLFloat },
		lng: { type: GraphQLFloat },
	})
})
export const AddrType = new GraphQLObjectType({
	name: 'Addr',
	description: 'addr from us census',
	fields: () => ({
		gid       : {type: GraphQLInt 	 },
		tlid      : {type: GraphQLInt 	 },
		fromhn    : {type: GraphQLString },
		tohn      : {type: GraphQLString },
		side      : {type: GraphQLString },
		zip       : {type: GraphQLString },
		plus4     : {type: GraphQLString },
		fromtyp   : {type: GraphQLString },
		totyp     : {type: GraphQLString },
		fromarmid : {type: GraphQLInt 	 },
		toarmid   : {type: GraphQLInt 	 },
		arid      : {type: GraphQLString },
		mtfcc     : {type: GraphQLString },
		statefp   : {type: GraphQLString },
	})
})
export const ShopType = new GraphQLObjectType({
	name: 'Shop',
	description: 'a merchant storefront',
	interfaces: [nodeInterface],
	fields: () => ({
		id					 : globalIdField(),
		uid					 : {	type: GraphQLString	},
		hmac				 : {	type: GraphQLString	},
		name			 	 : {	type: GraphQLString	},
		session 		 : {	type: GraphQLString	},
		jwt					 : {	type: GraphQLString	},
		scope				 : {	type: GraphQLString	},
		installedAt  : {	type: GraphQLFloat  },
	})
})
export const ValidateHmacType = new GraphQLObjectType({
	name: 'ValidateHmacGood',
	description: 'a merchant storefront session',
	fields: () => ({
		valid     	 : {	type: GraphQLBoolean },
		installed 	 : {	type: GraphQLBoolean },
		shop	    	 : {	type: GraphQLString	},
		redirectUrl	 : {	type: GraphQLString	},
	})
})
export const ShopSession = new GraphQLObjectType({
	name: 'ShopSessions',
	description: 'a merchant storefront session',
	fields: () => ({
		uid	  		: {	type: GraphQLString	},
		hmac  		: {	type: GraphQLString	},
		jwt 		  : {	type: GraphQLString	},
		name 	 		: {	type: GraphQLString	},
		remaining : {	type: GraphQLFloat },
	})
})
export const PlaceType = new GraphQLObjectType({
	name: 'Place',
	description: 'place from us census',
	fields: () => ({
		gid      : { type: GraphQLInt 	 }, 
		statefp  : { type: GraphQLString }, 
		placefp  : { type: GraphQLString }, 
		placens  : { type: GraphQLString }, 
		plcidfp  : { type: GraphQLString }, 
		name     : { type: GraphQLString }, 
		namelsad : { type: GraphQLString }, 
		lsad     : { type: GraphQLString }, 
		classfp  : { type: GraphQLString }, 
		cpi      : { type: GraphQLString }, 
		pcicbsa  : { type: GraphQLString }, 
		pcinecta : { type: GraphQLString }, 
		mtfcc    : { type: GraphQLString }, 
		funcstat : { type: GraphQLString }, 
		aland    : { type: GraphQLInt 	 }, 
		awater   : { type: GraphQLInt 	 }, 
		intptlat : { type: GraphQLString }, 
		intptlon : { type: GraphQLString }, 
		shape    : { type: GraphQLString },
	})
})
export const { connectionType: PredictionConnection } = connectionDefinitions({
	nodeType: PredictionType,
})
export const { connectionType: ColumnConnection } = connectionDefinitions({
	nodeType: ColumnType,
})
export const { connectionType: PointConnection } = connectionDefinitions({
	nodeType: PointType,
})
export const { connectionType: ColorConnection } = connectionDefinitions({
	nodeType: ColorType,
})
export const { connectionType: documentationConnection } = connectionDefinitions({
	nodeType: SingleView,
})
