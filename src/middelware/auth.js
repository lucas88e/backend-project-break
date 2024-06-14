const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
	const token = req.headers['x-auth-token']  || req.body.token;

	if (!token)
		return res
			.status(401)
			.send('Mira a ver si se te olvidado hacer login')

	console.log(token)

	try {
		const decoded = await jwt.verify(token, process.env.jwtPrivateKey)

		req.user = decoded

		next()
	} catch (err) {
		res.status(400).send('invalid token')
	}
}
