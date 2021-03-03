const functions = require("firebase-functions");
const crypto = require('crypto')
const { apikeysecret } = functions.config().twitter

const hash = crcToken => {
	hmac = crypto.createHmac('sha256', apikeysecret).update(crcToken).digest('base64')
	return hmac
}
exports.twitterWebhook = functions.https.onRequest((req, res) => {
	const crcToken = req.args['crc_token']
	console.log(crcToken, req.args)
	const response_token = hash(crcToken)
	return res.json({ response_token })
})
