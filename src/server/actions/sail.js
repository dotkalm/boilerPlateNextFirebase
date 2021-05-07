import { getXmlRequest, sednaRoute } from '../services/sedna'
export const getDestinations = async () => {
	try{
		const url = sednaRoute('destinations')
		const data = await getXmlRequest(url, params)
		return data
	}catch(err){
		console.log(err)
		return err
	}
}
