import Router from 'next/router'

export const checkMerchant = new Promise((resolve, reject) => {
	const { router } = Router 
	if(router && router.query){
		const { query } = router
		if(query.hmac && query.session){
			console.log(query)
		}else{
			//LOG IN AS ADMIN
			//create SHOP
		}
	}
})
export const checkAdminLogged = new Promise((resolve, reject) => { 
	const handleAuthStateChanged = async user => {
		const token = await getIdToken()
		const isAdmin = await getIdTokenResult() 
		if(user && user.uid){
			const { uid } = user
			const obj = { 
				uid, 
				token, 
				user: isAdmin.user, 
				isAdmin: isAdmin.user && isAdmin.user.claims.admin ? true : false,

			}
			console.log(obj,  user)
			return resolve(obj)
		}else{
			return reject("NOT AUTHORIZED")
		}
	}
})
