module.exports = {
	getAllVotes: (req, res) => {
		const db = req.app.get('db');
		const { id } = req.params;

		db.get_votes([+id])
			.then(votes => res.status(200).send(votes))
			.catch(err => console.log(err));
	},
	voter: (req, res, next) => {
		const { user_id, vote_id, is_entry, is_upvote, type } = req.body;
		const db = req.app.get('db');

		if(is_upvote === true){
			db.add_user_point([user_id])
			.then(res => res.status(200).end())
			.catch(err => console.log(err))
		}
		if(is_upvote === false){
			db.delete_user_point([user_id])
			.then(res => res.status(200).end())
			.catch(err => console.log(err))
		}

		if (type === "insert") {
			db.add_vote([user_id, is_entry, vote_id, is_upvote])
				.then(next())
				.catch(err => console.log(err));
		}

		if (type === "delete") {
			db.delete_vote([user_id, is_entry, vote_id])
				.then(next())
				.catch(err => console.log(err));
		}

		if (type === "update") {
			db.update_vote([user_id, is_entry, vote_id, is_upvote])
				.then(next())
				.catch(err => console.log(err));
		}

	},
	update_entry: (req, res, next) => {
		if (req.body.is_entry) {
			const db = req.app.get('db');
			const { user_id, vote_id, is_upvote, type } = req.body;
			let addVote = (num) => db.update_entry_votes_plus([vote_id, num]).then(res.status(200).end()).catch(err => res.status(500).send(err));
			let deleteVote = (num) => db.update_entry_votes_minus([vote_id, num]).then(res.status(200).end()).catch(err => res.status(500).send(err));

			if (type === "delete") { is_upvote ? deleteVote(1) : addVote(1) }
			if (type === "insert") { is_upvote ? addVote(1) : deleteVote(1) }
			if (type === "update") { is_upvote ? addVote(2) : deleteVote(2) }

		}
		else {
			next()
		}
	},
	update_comment:(req,res) =>{

		const db = req.app.get('db');
		const { user_id, vote_id, is_upvote, type } = req.body;
		let addVote = (num) => db.update_comment_votes_plus([vote_id, num]).then(res.status(200).end()).catch(err => res.status(500).send(err));
		let deleteVote = (num) => db.update_comment_votes_minus([vote_id, num]).then(res.status(200).end()).catch(err => res.status(500).send(err));

		if (type === "delete") { is_upvote ? deleteVote(1) : addVote(1) }
		if (type === "insert") { is_upvote ? addVote(1) : deleteVote(1) }
		if (type === "update") { is_upvote ? addVote(2) : deleteVote(2) }
	}
}