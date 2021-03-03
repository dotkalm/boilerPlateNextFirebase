export const time = async ({ }, request, db) => {
	const result = new Promise((resolve, reject) => {
    const textString = 'SELECT now()'
		console.log(textString)
		db.query(textString, (err, res) => {
			if(err){
				console.log(err, 7)
				reject(err)
			}else{
				resolve(res)
			}
		})
	})
		const p = await result 
		return p.rows
	}
}
