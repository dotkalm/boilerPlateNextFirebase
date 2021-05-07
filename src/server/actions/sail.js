import { sednaGet, sednaRoute } from '../services/sedna'
export const getDestinations = async () => {
	try{
		const url = sednaRoute('destinations')
		const params = new Object
		const data = await sednaGet(url, params)
		return data
	}catch(err){
		console.log(err)
		return err
	}
}
