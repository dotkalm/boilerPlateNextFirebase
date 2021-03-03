const { Pool } = require('pg');
let socketPath = '/cloudsql'
const password = process.env.PSQL_PASSWORD
const database = process.env.PSQL_DATABASE
const regex = new RegExp(process.env.OWNER)
const host = process.env.HOME && process.env.HOME.match(regex) ? '127.0.0.1' : process.env.PSQL_HOST  
const user = process.env.PSQL_USER
const creds = {
	user,
	password,
	database,
	host,
}
console.log(creds)
const pool = new Pool(creds)
export default pool 
