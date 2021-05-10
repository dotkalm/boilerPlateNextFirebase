import { allBasesAndMarinas } from '../services/sedna'
export const getDestinations = async () => {
	try{
		const sednaData = await allBasesAndMarinas()
		return { sednaData, bookingManager: [] } 
	}catch(err){
		console.log(err)
		return err
	}
}
