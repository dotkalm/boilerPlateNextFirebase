import { Pool } from 'pg'

const home = process.env.HOME
const owner =	process.env.OWNER
const socketPath = process.env.PSQL_SOCKETPATH
const psqlHost = process.env.PSQL_HOST
const user = process.env.PSQL_USER
const password = process.env.PSQL_PASSWORD
const database = process.env.PSQL_DATABASE
const project = process.env.PSQL_PROJECT
const zone = process.env.PSQL_ZONE
const instanceId = process.env.PSQL_INSTANCE_ID

	


//postgres://user:password@localhost/mydb?host=/cloudsql/myproject:us-east4:test
//Use postgresql://USER:PASS@127.0.0.1/ying-staging?host=/cloudsql/DATABASE_NAME


const regex = new RegExp(owner)
const host = home && home.match(regex) ? '127.0.0.1' : `${socketPath}/${project}:${zone}:${instanceId}` 
const creds = {
	user,
	password,
	database,
	host,
	max: 1,
	logging: false,
	dialect: 'postgres',
	ssl: false,
	dialectOptions: {
		ssl: false
	},
	operatorsAliases: false
}
console.log(creds)
const pool = new Pool(creds)
export default pool 
