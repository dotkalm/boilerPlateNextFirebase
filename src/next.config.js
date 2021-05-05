require('dotenv').config()
module.exports = {
	async redirects() {
		return [
			{
				source: '/auth/callback/redirect',
				destination: '/',
				permanent: true,
			},
		]
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.node = { }
		}
		return config
	},
	distDir: './next',
	images:{
		domains: [ 'firebasestorage.googleapis.com', 'storage.cloud.google.com', 'storage.googleapis.com' ],
	},
	externals: [ 'commonjs2 firebase-admin' ],
	"presets": ["next/babel"],
	"plugins": [["styled-components", { "ssr": true, "displayName": true }]],
	env: {
		RUNTIME_ENV: process.env.NODE_ENV,
	}
}

