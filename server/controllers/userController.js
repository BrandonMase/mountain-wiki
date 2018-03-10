module.exports = {
  getUserStatus:(req, res) =>{
    res.status(200).send(req.session)
  },
  getUserInfo:(req,res) =>{
    const db = req.app.get('db');
    const {id} = req.params;

    db.get_user_info([id])
      .then(user=> res.status(200).send(user))
      .catch(err =>console.log(err))
  },
  getUserActivity:(req,res) =>{
    const db = req.app.get('db');
    const {id} = req.params;

    db.get_user_posts([id])
      .then(post =>{
        db.get_user_comments([id])
          .then(comments =>{
            let obj = post.concat(comments)
            res.status(200).send(obj);
          })
      })
      .catch(err => console.log(err))
  }
}