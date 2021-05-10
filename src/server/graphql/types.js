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

export const { nodeField, nodeInterface } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId)
    switch (type) {
      case 'Region':
        return regionData.find((obj) => obj.id === id)
      case 'Country':
        return countryData.find((obj) => obj.id === id)
      case 'Marina':
        return countryData.find((obj) => obj.id === id)
      case 'Base':
        return baseData.find((obj) => obj.id === id)
    }
  },
  obj => { 
		if (obj.name) {
      return userType
		}
  }
)
export const DestinationConnection = new GraphQLObjectType({
	name: 'VesselDestinationOrRegionConnection',
	interfaces: [ nodeInterface ],
	description: 'region of vessel connection',
	fields: () => ({
		id: globalIdField(),
		edges: { 
			type: new GraphQLList(RegionType),
			resolve: (p,args) => {
				console.log(p, args)
				return p
			}
		},
	})
})
export const RegionType = new GraphQLObjectType({
	name: 'Region',
	interfaces: [ nodeInterface ],
	description: 'region of the world',
	fields: () => ({
		id: globalIdField(),
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


