const handleAddNew = (req, res, db) => {
	const { note, time } = req.body;
	if(!note || !time) {
		return res.status(400).json('incorrect form of submission');
	}
	db.transaction(trx => {
		trx.insert({
			note: note,
			time: time,
		})
		.into('history')
		.returning('note')
		.then(note => {
			return trx('history')
				.returning('*')
				.insert({
					note: note[0],
					time: time,
				})
				.then(user => {
					res.json(user[0])
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to add your new log'))
}

module.exports = {
	handleAddNew: handleAddNew
}