const functions = require("firebase-functions");
const next = require("next");
const { join } = require('path')
const { getIpAddress } = require('./src/shared/getIpAddress')
const dev = process.env.NODE_ENV !== 'production'
const nextjsDistDir = join('src', require('./src/next.config.js').distDir)
const ngrok = require('ngrok');

const app = next({
  dev,
  conf: {
    distDir: nextjsDistDir,
  },
})
const handle = app.getRequestHandler()

exports.nextjsFunc = functions.https.onRequest((req, res) => {
	req.url = req.url || '/'
	return app.prepare().then(() => handle(req, res))
})


