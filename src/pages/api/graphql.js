import { graphqlHTTP } from 'express-graphql'
import Schema from '../../graphql/schema'

const graphQLConfigs = {
	schema: Schema
}
graphQLConfigs.graphiql = true
graphQLConfigs.debug = true
export default graphqlHTTP(graphQLConfigs)
