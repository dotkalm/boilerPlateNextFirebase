import { postRequest } from '../../shared/utils/request'

const {
	NAUSYS_URL,
	NAUSYS_BOOKING_ROUTE,
	NAUSYS_YACHTS_ROUTE,
	NAUSYS_BASES_ROUTE,
	NAUSYS_USERNAME,
	NAUSYS_PASSWORD,
	NAUSYS_REGIONS_ROUTE,
	NAUSYS_CHARTER_COMPANIES_ROUTE,
	NAUSYS_LOCATIONS_ROUTE,
	NAUSYS_COUNTRIES_ROUTE,
} = process.env

const routeMap = {
	bases: NAUSYS_BASES_ROUTE,
	yachts:	NAUSYS_YACHTS_ROUTE,
	booking: NAUSYS_BOOKING_ROUTE,
	locations: NAUSYS_LOCATIONS_ROUTE,
	regions: NAUSYS_REGIONS_ROUTE,
	countries: NAUSYS_COUNTRIES_ROUTE,
	companies: NAUSYS_CHARTER_COMPANIES_ROUTE,
}

export const getNausys = async (route, paramsRoute) => {
	const url = `${NAUSYS_URL}${routeMap[route]}${paramsRoute ? paramsRoute : ''}`
	const body = {
		username: NAUSYS_USERNAME,
		password: NAUSYS_PASSWORD
	}
	const response = await postRequest(url, body)
	return response 
}
