import { graphqlHTTP } from 'express-graphql'
import Schema from '../../server/graphql/schema'

const graphQLConfigs = {
	schema: Schema
}
graphQLConfigs.graphiql = true
graphQLConfigs.debug = true
export default graphqlHTTP(graphQLConfigs)
