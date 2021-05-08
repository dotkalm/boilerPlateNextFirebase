import { sednaGet, sednaRoute } from '../../src/server/services/sedna'

test('sedna low level', async () => {
	const url = sednaRoute('destinations')
	const params = {}
  const data = await sednaGet(url, params)
	console.log(data)
	expect(data).not.toBe(undefined)
	expect(Array.isArray(data.destinations)).toBe(true)
})

test('the fetch fails with an error', async () => {
  try {
		const url = sednaRoute('destinations')
		const params = {}
    await sednaGet(url, params)
  } catch (e) {
    expect(e).toMatch('error')
  }
})
