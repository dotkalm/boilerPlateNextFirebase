import { postRequest } from '../../../src/shared/utils/request'
import { basesRequest } from '../../../src/shared/graphql/client'


test('retrieve data from graphql', async () => {
	const data = await postRequest(undefined, { query: basesRequest() })
	console.log(data)
	expect(data.errors).toBe(false)
})
