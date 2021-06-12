const handleHistoryGet = (req, res, db) => {
	// const { } = req.params;
	db.select('*').from('history')
	.then(user => {
		if(user.length >= 0) {
			res.json(user)
		} else {
			res.status(400).json('not found')
		}
	}).catch(err => res.status(400).json('error getting the user'))
}

module.exports = {
	handleHistoryGet: handleHistoryGet
}