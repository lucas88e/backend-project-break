module.exports = (req, res, next) => {
	if (!req.user.isAdmin)
		return res
			.status(403)
			.json({ message: 'NO ESTAS AUTORIZADO PARA ENTRAR' })

	next()
}
