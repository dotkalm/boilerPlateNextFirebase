import { getXmlRequest, sednaRoute } from '../../src/server/sedna'

test('sedna low level', async () => {
	const url = sednaRoute('destinations')
	const params = {}
  const data = await getXmlRequest(url, params)
	expect(data).not.toBe(undefined)
	console.log(data)
	expect(data.destinations).not.toBe(undefined)
})

test('the fetch fails with an error', async () => {
  try {
		const url = sednaRoute('destinations')
		const params = {}
    await getXmlRequest(url, params)
  } catch (e) {
    expect(e).toMatch('error')
  }
})
