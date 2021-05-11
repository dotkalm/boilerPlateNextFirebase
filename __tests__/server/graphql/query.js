import { postRequest } from '../../../src/shared/utils/request'
import { basesRequest } from '../../../src/shared/graphql/client'



test('retrieve data from graphql', async () => {
	const type = 'bases' 
	const { data } = await postRequest(undefined, { 
		query: basesRequest({ date:1620691110632 }, type) 
	})
	console.log(data)
	expect(data.errors).toBe(undefined)
	expect(data[type]).not.toBe(null)
})
