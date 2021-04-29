import Router from 'next/router'

export const checkMerchant = new Promise((resolve, reject) => {
	const { router } = Router 
	if(router && router.query){
		const { query } = router
		if(query.hmac && query.session){
		}else{
			//LOG IN AS ADMIN
			//create SHOP
		}
	}
})
