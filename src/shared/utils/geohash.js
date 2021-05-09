const base32 = '0123456789bcdefghjkmnpqrstuvwxyz'

class Geohash {
	static encode(lat, lon, precision) {
		if (typeof precision == 'undefined') {
			for (let p=1; p<=12; p++) {
				const hash = Geohash.encode(lat, lon, p)
				const posn = Geohash.decode(hash)
				if (posn.lat==lat && posn.lon==lon) return hash
			}
			precision = 12
		}

		lat = Number(lat)
		lon = Number(lon)
		precision = Number(precision)

		if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error('Invalid geohash')

		let idx = 0; 
		let bit = 0
		let evenBit = true
		let geohash = ''

		let latMin =  -90, latMax =  90
		let lonMin = -180, lonMax = 180

		while (geohash.length < precision) {
			if (evenBit) {
				const lonMid = (lonMin + lonMax) / 2
				if (lon >= lonMid) {
					idx = idx*2 + 1
					lonMin = lonMid
				} else {
					idx = idx*2
					lonMax = lonMid
				}
			} else {
				const latMid = (latMin + latMax) / 2
				if (lat >= latMid) {
					idx = idx*2 + 1
					latMin = latMid
				} else {
					idx = idx*2
					latMax = latMid
				}
			}
			evenBit = !evenBit

			if (++bit == 5) {
				geohash += base32.charAt(idx)
				bit = 0
				idx = 0
			}
		}

		return geohash
	}
	static decode(geohash) {
		const bounds = Geohash.bounds(geohash)

		const latMin = bounds.sw.lat, lonMin = bounds.sw.lon
		const latMax = bounds.ne.lat, lonMax = bounds.ne.lon

		let lat = (latMin + latMax)/2
		let lon = (lonMin + lonMax)/2

		lat = lat.toFixed(Math.floor(2-Math.log(latMax-latMin)/Math.LN10))
		lon = lon.toFixed(Math.floor(2-Math.log(lonMax-lonMin)/Math.LN10))

		return { lat: Number(lat), lon: Number(lon) }
	}
	static bounds(geohash) {
		if (geohash.length == 0) throw new Error('Invalid geohash')

		geohash = geohash.toLowerCase()

		let evenBit = true
		let latMin =  -90, latMax =  90
		let lonMin = -180, lonMax = 180

		for (let i=0; i<geohash.length; i++) {
			const chr = geohash.charAt(i)
			const idx = base32.indexOf(chr)
			if (idx == -1) throw new Error('Invalid geohash')

			for (let n=4; n>=0; n--) {
				const bitN = idx >> n & 1
				if (evenBit) {
					const lonMid = (lonMin+lonMax) / 2
					if (bitN == 1) {
						lonMin = lonMid
					} else {
						lonMax = lonMid
					}
				} else {
					const latMid = (latMin+latMax) / 2
					if (bitN == 1) {
						latMin = latMid
					} else {
						latMax = latMid
					}
				}
				evenBit = !evenBit
			}
		}

		const bounds = {
			sw: { lat: latMin, lon: lonMin },
			ne: { lat: latMax, lon: lonMax },
		}
		return bounds
	}
}

export const geoEncode = (lat, lng, precision) => Geohash.encode(lat, lng, precision)
export const geoDecode = geohash => Geohash.decode(geohash)
