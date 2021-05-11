import { graphqlHTTP } from 'express-graphql'
import Schema from '../../server/graphql/schema'
import { verifyHmac } from '../../shared/utils/verifyHmac'

const server = async (request, response, graphQLParams) => {
	return {
		schema: Schema,
		rootValue: (hmac, query) => {
			const truth = verifyHmac(hmac, query)
			return truth
		},
		graphiql: true,
		debug: true,
	}
}
export default graphqlHTTP(server)
