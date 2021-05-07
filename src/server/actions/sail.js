import { sednaGet, sednaRoute } from '../services/sedna'
export const getDestinations = async () => {
	try{
		const sednaData = await sednaGet(sednaRoute('destinations'), {})
		console.log(sednaData)
		return sednaData
	}catch(err){
		console.log(err)
		return err
	}
}
