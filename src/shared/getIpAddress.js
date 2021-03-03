const getIpAddress = async (req, res, next) => {
	try {
		req.body.ip =
			req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			(req.connection.socket
				? req.connection.socket.remoteAddress
				: null
			)
		console.log(req.body.ip, 11)
		next()
	} catch (err) {
		console.log(err.message, 'ERROR')
	}
}

exports.getIpAddress = getIpAddress
