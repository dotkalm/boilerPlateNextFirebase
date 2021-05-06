require('dotenv').config()
const defaultExport = () => {
	const importEnvFromRoot = () => {
		const env = {}
		const keys = Object.keys(process.env)
		const index = keys.findIndex(e => e === 'NODE_ENV') + 1
		const lengthOfArray = keys.length - index 
		const newArray = new Array(lengthOfArray) 
		for(let i = 0; i < lengthOfArray; i++){
			const element = Object.keys(process.env)[i + index]
			env[element] = process.env[element]
		}
		return env
	}
	const o = {
		webpack: (config, { isServer }) => {
			if (!isServer) {
				config.node = { }
			}
			return config
		},
		distDir: './next',
		externals: [ 'commonjs2' ],
		"presets": ["next/babel"],
		"plugins": [["styled-components", { "ssr": true, "displayName": true }]],
		env: importEnvFromRoot(),
	}
	return o
}
module.exports = defaultExport() 
