import sqlite3 from 'sqlite3' 
const sqlitePath = process.env.SQLITE_PATH
const sqliteFilename = process.env.SQLITE_FILENAME
console.log(`${sqlitePath}${sqliteFilename}`)
const db = new sqlite3.Database(`${sqlitePath}${sqliteFilename}`)

