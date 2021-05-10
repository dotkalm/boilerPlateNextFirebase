import { sednaGet, sednaRoute, allBasesAndMarinas } from '../../src/server/services/sedna'

test('sedna low level', async () => {
	const url = sednaRoute('destinations')
	const params = {}
  const data = await sednaGet(url, params)
	expect(data).not.toBe(undefined)
	for(const key in data){
		console.log(data[key])
	}
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
