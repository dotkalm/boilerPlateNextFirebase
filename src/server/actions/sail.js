import { sednaGet, sednaRoute } from '../services/sedna'
export const getDestinations = async () => {
	try{
		const url = sednaRoute('destinations')
		const params = new Object
		const { destinations } = await sednaGet(url, params)
		console.log(destinations.destination)
		return destinations.destination
	}catch(err){
		console.log(err)
		return err
	}
}
