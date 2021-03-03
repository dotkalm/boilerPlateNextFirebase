const { Pool } = require('pg');
let socketPath = '/cloudsql'
let host = '
process.env.HOME && process.env.HOME.match(/^\/Users\/joelholmberg$/) ? host = '127.0.0.1' : host 
const user = process.env.PSQL_USER
const password = process.env.PSQL_PASSWORD
const database = process.env.PSQL_DATABASE
const driver_name = 'postgres+pg8000' 
const creds = {
	user,
	password,
	database,
	host,
}
console.log(creds)
const pool = new Pool(creds)
export default pool 
