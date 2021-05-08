import { allBasesAndMarinas } from '../../src/server/services/sedna'

test('all marinas/bases have baseIds', async () => {
  const data = await allBasesAndMarinas()
	expect(data).not.toBe(undefined)
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
		expect(dock.baseId).not.toBe(undefined)
	}
})

test('all marinas/bases have countryIds', async () => {
  const data = await allBasesAndMarinas()
	expect(data).not.toBe(undefined)
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
		expect(dock.countryId).not.toBe(undefined)
	}
})
test('all marinas/bases have regionIds', async () => {
  const data = await allBasesAndMarinas()
	console.log(data)
	expect(data).not.toBe(undefined)
	for(let i = 0; i < data.length; i++){
		const dock = data[i]
		expect(dock.regionId).not.toBe(undefined)
	}
})
test('the fetch fails with an error', async () => {
  try {
    await allBasesAndMarinas()
  } catch (e) {
    expect(e).toMatch('error')
  }
})
