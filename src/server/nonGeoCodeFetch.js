export const nonGeoCodeFetch = async ({ county }, request, db) => {
	const idToken = request.headers.authorization
	const user = await getLogin(idToken)
	const result = new Promise((resolve, reject) => {
    const textString = `
			SELECT mtfcc, name 
			FROM county 
			WHERE name = $1 As g
		`
		console.log(textString, [county], 8)
		db.query(textString, [county], (err, res) => {
			if(err){
				console.log(err, 11)
				reject(err)
			}else{
				resolve(res)
			}
		})
	})
	const p = await result 
	return p.rows
}

