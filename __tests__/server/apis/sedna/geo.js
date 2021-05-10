import { geocoderQueryOne } from '../../src/server/services/arcgis'

test('geo low level, query exactly matches response', async () => {
	const locationsArray = ['Mediterranean Sea', 'Asia', 'Caribbean Sea', 'Phuket']
	for(let i =0; i < locationsArray.length; i++){
		const locationQuery = locationsArray[i]
		const data = await geocoderQueryOne(locationQuery)
		expect(data.name).toEqual(locationQuery)
		expect(Array.isArray(Object.keys(data.extent))).toBe(true)
	}
})

test('the fetch fails with an error', async () => {
  try {
		await geocoderQueryOne('asia')
  } catch (e) {
    expect(e).toMatch('error')
  }
})

