import { graphqlHTTP } from 'express-graphql'
import Schema from '../../graphql/schema'

const graphQLConfigs = {
	schema: Schema,
	rootValue: root,
}
if(process.env.RUNTIME_ENV === 'development'){
	graphQLConfigs.graphiql = true
	graphQLConfigs.debug = true
}else{
	graphQLConfigs.graphiql = false
	graphQLConfigs.debug = false
}
export default graphqlHTTP(graphQLConfigs)
