import { getNausys } from '../../../../src/server/services/nausys'

test('retrieve locations from nausys api', async () => {
	const data = await getNausys('locations')
	console.log(data)
	expect(data.errorCode).toBe(undefined)
	expect(data.status).toBe("OK")
})

test('retrieve bases from nausys api', async () => {
	const data = await getNausys('bases')
	console.log(data)
	expect(data.errorCode).toBe(undefined)
	expect(data.status).toBe("OK")
})

