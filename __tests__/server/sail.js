import { getDestinations } from '../../src/server/actions/sail'

test('sail low level', async () => {
	const url = getDestinations('destinations')
	console.log(url)
	expect(url).not.toBe(undefined)
})

