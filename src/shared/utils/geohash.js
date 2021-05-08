import 'Geohash' from 'latlon-geohash'

export const encode = (lat,lng) => Geohash.encode(lat,lng)
