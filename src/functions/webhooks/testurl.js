const functions = require("firebase-functions");

exports.testurl = functions.https.onRequest((req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	const { headers } = req
	console.log(headers, ip, 4)
	return res.json({ ip, headers })
})

