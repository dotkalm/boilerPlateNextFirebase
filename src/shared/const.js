const demoHeader = {
  host: process.env.GRAPHQL_LOCAL_SERVER,
  connection: 'keep-alive',
  'content-length': '204',
  'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
  accept: 'application/json',
  'sec-ch-ua-mobile': '?0',
  'user-agent': process.env.DESKTOP_USER_AGENT,
  'content-type': 'application/json',
  origin: process.env.DEV_LOCAL_ORIGIN,
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  referer: process.env.DEV_LOCAL_ORIGIN,
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9',
  cookie: process.env.GA_SC,
} 

export const demoQuery = `  
	mutation{
		addStore(
			shop:
				{
					name:"${process.env.DEMO_SHOPIFY_URL}"
					timestamp: ${Date.now()} 
					hmac: "${process.env.DEMO_HMAC}"
				}
		){
			name
		}
	}
`
