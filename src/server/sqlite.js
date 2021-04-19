import sqlite3 from 'sqlite3' 
const sqlitePath = process.env.SQLITE_PATH
const sqliteFilename = process.env.SQLITE_FILENAME
console.log(`${sqlitePath}${sqliteFilename}`)
const db = new sqlite3.Database(`${sqlitePath}${sqliteFilename}`)

export const queryLocal = (table, fields, where, params) => {

	const dbPromise = new Promise((res, rej) => {
		const countsql = `SELECT count(*) FROM ${table} ${where}`
		db.get(countsql, params, (err, row) => {
			const quantity = row['count(*)']
			const sql = `SELECT ${fields} FROM ${table} ${where}` 
			db.all(sql, params, (err, rows) => {
				if(err){
					console.log(err)
					throw err
				}
				res(rows)
			})
		})
	})
	
	return dbPromise
}


