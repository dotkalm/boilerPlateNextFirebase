const functions = require("firebase-functions");
const next = require("next");
const { join } = require('path')
const { getIpAddress } = require('./src/shared/getIpAddress')
const dev = process.env.NODE_ENV !== 'production'
const nextjsDistDir = join('src', require('./src/next.config.js').distDir)

const app = next({
  dev,
  conf: {
    distDir: nextjsDistDir,
  },
})

const handle = app.getRequestHandler()

exports.nextjsFunc = functions.https.onRequest((req, res) => {
	const host = req.get('x-forwarded-host')
	console.log(host, '<--- host')
	req.url = req.url || '/'
	return app.prepare().then(() => handle(req, res))
})


