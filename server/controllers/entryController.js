module.exports = {
  getEntry: (req, res) => {
    const db = req.app.get('db');
    const {id,user_id} = req.params;

    db.get_entry([id,user_id])
      .then(entryRes => {
        db.get_comments([id])
          .then(commentRes => {
            let obj = { entry: entryRes, comments: commentRes };
            console.log(obj)
            res.status(200).send(obj)
          })
      })
      .catch(e => console.log(e))
  },
  getEntryUpdater: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    // console.log(req.params)
    
    db.get_entry_for_update([+id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(e => {
        console.log(e);
        res.status(500).end();
      })
  },
  addEntry: (req, res) => {
    const db = req.app.get('db');
    // console.log(req.body)
    const { title, content, typeOfEntry, seen, date, userId, labels } = req.body
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    db.add_entry([title, content, typeOfEntry, seen, date, userId, labels,text])
      .then(id =>{

        db.add_vote(userId,true,id[0].auto_id,true).then().catch(err => console.log(err))
        res.status(200).send(id)})
      .catch(e=>console.log(e))

      db.add_user_point([userId])
      .then(res => res.status(200).end())
      .catch(err => console.log(err))
  },
  updateEntry: (req, res) => {
    const db = req.app.get('db');
    console.log(req.body);
    const { title, content, typeOfEntry, seen, date, userId, labels,updateId } = req.body
    db.update_entry([title, content, typeOfEntry, seen, labels, updateId])
      .then(() => res.status(200).end)
      .catch(() => { res.status(500).end(); console.log(e) })
  }
}