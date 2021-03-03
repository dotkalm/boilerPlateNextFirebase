import { getLogin } from './firebaseNode'

export const geocode = async ({ address, quantity }, request, db) => {
	const idToken = request.headers.authorization
	const user = await getLogin(idToken)
	const result = new Promise((resolve, reject) => {
    const textString = 'SELECT g.rating, (addy).address As stno, (addy).streetname As street, (addy).streettypeabbrev As styp, (addy).location As city, (addy).stateabbrev As st,(addy).zip FROM geocode($1, $2) As g'
		console.log(textString, [address, quantity], 8)
		db.query(textString, [address, quantity], (err, res) => {
			if(err){
				console.log(err, 11)
				reject(err)
			}else{
				resolve(res)
			}
		})
	})
	const { admin, guest } = user 
	if(admin || guest){
		const p = await result 
		return p.rows
	}else{
		return []
	}
}
