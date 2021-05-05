import { postRequest, getRequest } from '../../src/server/sedna'

test('sedna low level', async () => {
	const { SEDNA_API_ROUTE, SEDNA_DESTINATIONS_ROUTE } = process.env
	const params = {}
  const data = await getRequest(SEDNA_API_ROUTE, SEDNA_DESTINATIONS_ROUTE, params)
  expect(typeof(data)).toBe('object')
  expect(data['destinations']).not.toEqual(undefined)
  expect(data['destinations']['destination']).not.toEqual(undefined)
	const d = data['destinations']['destination']
  expect(d).toBe('come sail away')
})

test('the fetch fails with an error', async () => {
  try {
		const { SEDNA_API_ROUTE, SEDNA_DESTINATIONS_ROUTE } = process.env
		const params = {}
    await getRequest(SEDNA_API_ROUTE, SEDNA_DESTINATIONS_ROUTE, params)
  } catch (e) {
    expect(e).toMatch('error')
  }
})
