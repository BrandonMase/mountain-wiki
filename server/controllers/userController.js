module.exports = {
  getUserStatus:(req, res) =>{
    res.status(200).send(req.session)
  },
  getUserInfo:(req,res) =>{
    const db = req.app.get('db');
    const {id} = req.params;
    console.log(req.params)

    db.get_user_info([id])
      .then(user=> res.status(200).send(user))
      .catch(err =>console.log(err))
  },
  getUserActivity:(req,res) =>{
    const db = req.app.get('db');
    const {id,seen} = req.params;
    if(seen == "true"){
      db.get_user_posts_own([id])
      .then(post =>{
        db.get_user_comments_own([id])
          .then(comments =>{
            let obj = post.concat(comments)
            res.status(200).send(obj);
          })
      })
      .catch(err => console.log(err))
    }


    if(seen == "false"){
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
  },

  nodeMailer:(req,res) => {
    const db = req.app.get('db');
    const {user_id,mailer} = req.params;

    db.node_mailer([mailer,user_id])
      .then(res=>res.status(200).end())
      .catch(err => console.log(err));
  }
}