import { postRequest } from '../../shared/utils/request'

const {
	NAUSYS_URL,
	NAUSYS_BOOKING_ROUTE,
	NAUSYS_BASES_ROUTE,
	NAUSYS_USERNAME,
	NAUSYS_PASSWORD,
	NAUSYS_LOCATIONS_ROUTE,
} = process.env

const routeMap = {
	bases: NAUSYS_BASES_ROUTE,
	booking: NAUSYS_BOOKING_ROUTE,
	locations: NAUSYS_LOCATIONS_ROUTE,
}

export const getNausys = async route => {
	const url = `${NAUSYS_URL}${routeMap[route]}`
	const body = {
		username: NAUSYS_USERNAME,
		password: NAUSYS_PASSWORD
	}
	const response = await postRequest(url, body)
	return response 
}
