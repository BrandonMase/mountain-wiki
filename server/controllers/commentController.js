module.exports = {
  addComment: (req, res) => {
    const db = req.app.get('db');
    const { date, newAnswer, entry_id, user_id } = req.body;

    // console.log(req.body);

    db.add_answer([date, newAnswer, entry_id, user_id])
      .then(res.status(200).end())
      .catch(res.status(500).end());
  },
  updateComment: (req, res) => {
    const db = req.app.get('db');
    const { newContent, auto_id } = req.body;

    db.update_answer([newContent, auto_id])
      .then(res.status(200).end())
      .catch(e => { res.status(500).end(); console.log(e) })
  }
}