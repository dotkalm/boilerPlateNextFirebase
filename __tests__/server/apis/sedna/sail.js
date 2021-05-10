import { getDestinations } from '../../src/server/actions/sail'

test('sail low level', async () => {
	const data = await getDestinations('destinations')
	expect(data).not.toBe(undefined)
})

