import * as graphql from 'graphql'

const {
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLID,
} = graphql

export const DestinationConnection = new GraphQLObjectType({
	name: 'vesselDestinationOrRegionConnection',
	description: 'region of vessel connection',
	fields: () => ({
		edges: { 
			type: new GraphQLList(DestinationType),
			resolve: (p,args) => {
				return p
			}
		},
	})
})
export const DestinationType = new GraphQLObjectType({
	name: 'vesselDestinationOrRegion',
	description: 'region of vessel',
	fields: () => ({
		name : { 
			type: GraphQLString, 
			resolve: (p,args) => {
				console.log(p)
			}
		},
		apiServiceId: { type: GraphQLID },
		apiService: { type: GraphQLString },
	})
})
export const CountryType = new GraphQLObjectType({
	name: 'vesselCountry',
	description: 'country of vessel',
	fields: () => ({
		name : { type: GraphQLString },
		apiServiceId: { type: GraphQLID },
		apiService: { type: GraphQLString },
	})
})
export const BaseType = new GraphQLObjectType({
	name: 'vesselBase',
	description: 'base of vessel',
	fields: () => ({
		name : { type: GraphQLString },
		apiServiceId: { type: GraphQLID },
		apiService: { type: GraphQLString },
	})
})
export const MarinaType = new GraphQLObjectType({
	name: 'vesselMarina',
	description: 'marina of vessel',
	fields: () => ({
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


