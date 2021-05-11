import crypto from 'crypto'
import timingSafeCompare from 'tsscmp'

export const verifyHmac = (hmac, data) => {
	const newHmac = Buffer.from(crypto.createHmac("sha256", process.env.SHARED_SECRET)
		.update(data)
		.digest("hex"), 'utf-8')
	console.log(data)
	const providedHmac = Buffer.from(hmac, 'utf-8')
	const truth = timingSafeCompare(newHmac.toString(), providedHmac.toString())
	console.log(truth)
	return truth
}
