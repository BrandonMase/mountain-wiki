module.exports = {
  addComment: (req, res) => {
    const db = req.app.get('db');
    const { newDate, newAnswer, entry_id, user_id } = req.body;
    console.log("LOOK DATE",req.body)
    // console.log(req.body);

    db.add_answer([newDate, newAnswer, entry_id, user_id])
      .then(id =>{
        db.add_vote(user_id,false,id[0].auto_id,true)
          .then().catch(err => console.log(err));

        res.status(200).end();
      })
      .catch(res.status(500).end());
  },
  updateComment: (req, res) => {
    const db = req.app.get('db');
    const { newContent, auto_id } = req.body;

    db.update_answer([newContent, auto_id])
      .then(res.status(200).end())
      .catch(e => { res.status(500).end(); console.log(e) })
  },
  addReply:(req,res) =>{
    const db = req.app.get('db');
    const {ref_answer_id,date,content,user_id,entry_id} = req.body
    db.add_reply([ref_answer_id,date,content,user_id,entry_id])
      .then(id =>{
        db.add_vote(user_id,false,id[0].auto_id,true)
          .then().catch(err => console.log(err))
        res.status(200).end()
      })
      .catch(err => console.log(err))
  }
}