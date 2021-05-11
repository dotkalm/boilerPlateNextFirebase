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
import Mutation from './mutation'
import { 
	FieldType,
	RegionConnection,
	CountryConnection,
	BaseConnection,
	MarinaConnection,
} from './types'
import { 
	connectionFromArray,
} from './connection'

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: (args, request) => ({
		regions: {
			type: RegionConnection,
			description: 'a region that has vessels',
			args: {
				date		 : { type: GraphQLFloat },
				crew		 : { type: GraphQLBoolean }, 
				length	 : { type: GraphQLInt }, 
				region   : { type: GraphQLString }, 
				first		 : { type: GraphQLInt }, 
				last		 : { type: GraphQLInt }, 
			},
			resolve(parent, args, request){
				console.log(args)
				return connectionFromArray([{name: 'me'}], args)
			}
		},
		countries: {
			type: CountryConnection,
			description: 'a country that has vessels',
			args: {
				date		 : { type: GraphQLFloat },
				crew		 : { type: GraphQLBoolean }, 
				length	 : { type: GraphQLInt }, 
				region   : { type: GraphQLString }, 
				first		 : { type: GraphQLInt }, 
				last		 : { type: GraphQLInt }, 
			},
			resolve(parent, args, request){
				console.log(args)
				return connectionFromArray([{name: 'me'}], args)
			}
		},
		bases: {
			type: BaseConnection,
			description: 'a base that has vessels',
			args: {
				date		 : { type: GraphQLFloat },
				crew		 : { type: GraphQLBoolean }, 
				length	 : { type: GraphQLInt }, 
				region   : { type: GraphQLString }, 
				country  : { type: GraphQLString }, 
				first		 : { type: GraphQLInt }, 
				last		 : { type: GraphQLInt }, 
			},
			resolve(parent, args, request){
				const v = parent(request.headers.hmac, JSON.stringify(request.body))
				console.log(v)
				return connectionFromArray([{name: 'me'}], args)
			}
		},
		marinas: {
			type: MarinaConnection,
			description: 'a base that has vessels',
			args: {
				date		 : { type: GraphQLFloat },
				crew		 : { type: GraphQLBoolean }, 
				length	 : { type: GraphQLInt }, 
				region   : { type: GraphQLString }, 
				country  : { type: GraphQLString }, 
				base 		 : { type: GraphQLString }, 
				first		 : { type: GraphQLInt }, 
				last		 : { type: GraphQLInt }, 
			},
			resolve(parent, args, request){
				console.log(args)
				return connectionFromArray([{name: 'me'}], args)
			}
		},
	})
})

const Schema = new graphql.GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})
export default Schema

