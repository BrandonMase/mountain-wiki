module.exports = {
  getEntry: (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    console.log(id)

    db.get_entry([id])
      .then(entryRes => {
        db.get_comments([id])
          .then(commentRes => {
            let obj = { entry: entryRes, comments: commentRes };
            res.status(200).send(obj)
          })
      })
      .catch(e => console.log(e))
  }
}