const axios = require('axios');
require('dotenv').config();

module.exports={
    setUser:(req,res)=>{
          axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
        client_id:process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secert:process.env.AUTH0_CLIENT_SECERT,
        code:req.query.code,
        grant_type: 'authorization_code',
        redirect_uri:`http://${req.headers.host}/auth/callback`
      }).then(accessTokenResponse => {
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessTokenResponse.data.access_token}`)
          .then(userInfoResponse => {
            const userData = userInfoResponse.data;
            return req.app.get('db').get_user_by_auth0_sub(userData.sub)
              .then(users => {
                if(users.length) {

                  const user = {
                    name: users[0].name,
                    user_id:users[0].auto_id,
                    picture:users[0].picture,
                    total_points:+users[0].total_points,
                  }
                  req.session.user = user;
                  res.redirect('/');
                } else {
                    let date = new Date();
                  return req.app.get('db').create_user([userData.sub, userData.email, userData.name, userData.picture,date])
                    .then(users => {

                        const user = {
                            name: users[0].name,
                            user_id:users[0].auto_id,
                            picture:users[0].picture,
                            total_points:+users[0].total_points,
                          }
                        
                      req.session.user = user;
                      res.redirect('/');
                    })
                }
              })
        })
        }).catch(e => {
          console.log("server error", e);
          res.send("An error happened on the server!");
      })
},
    getUser:(req,res) =>{
        let user = req.session.user;
        if(user){
            res.status(200).send({message:true,user:user});
        }
        else{
            res.status(200).send({message:false})
        }
    }
}