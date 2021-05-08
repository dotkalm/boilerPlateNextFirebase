import { sednaGet, sednaRoute } from '../services/sedna'
export const getDestinations = async () => {
	try{
		const sednaData = await sednaGet(sednaRoute('destinations'), {})
		return { sednaData, bookingManager: [] } 
	}catch(err){
		console.log(err)
		return err
	}
}
