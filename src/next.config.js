require('dotenv').config()
const defaultExport = context => {
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
		distDir: './next',
		"presets": ["next/babel"],
		future: {
			webpack5: true,
		},
		"plugins": [["styled-components", { "ssr": true, "displayName": true }]],
		env: importEnvFromRoot(),
	}
	return o
}
module.exports = defaultExport()
