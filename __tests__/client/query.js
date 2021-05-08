import {  } from '../../src/server/actions/sail'

test('query low level', async () => {
	const data = await getDestinations('destinations')
	expect(data).not.toBe(undefined)
})


