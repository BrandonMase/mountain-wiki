const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');
const landingController = require('./controllers/landingController');
const entryController = require('./controllers/entryController')
const commentController = require('./controllers/commentController')
const userController = require('./controllers/userController');
const checkUserStatus = require('./middlewares/checkUserStatus');
const voteController = require('./controllers/voteController');
const searchController = require('./controllers/searchController');
const reportController = require('./controllers/reportController');
const authController = require('./controllers/authController')
const mailController = require('./controllers/mailController')
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

require('dotenv').config();

massive(process.env.CONNECTION_STRING).then(db => app.set('db', db)).catch(e => console.log("massive error",e));
const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    //two weeks
    maxAge: 60 * 60 * 24 * 14 * 1000,
  },
}));

//Landing page 
  //get All landing entries LIMIT 9 for each
app.get('/api/getLandingEntries', landingController.getLandingEntries);
  //gets 10 more of whatever type is selected
  app.get('/api/getMore/:type')

//USER INFORMATION
  //check if user is logged in
app.get('/api/checkUserStatus',checkUserStatus.checkUserStatus,userController.getUserStatus)
app.get('/api/getUserInfo/:id/:seen',userController.getUserInfo);
app.get('/api/getUserActivity/:id/:seen',userController.getUserActivity);
  //delete user
app.delete('/api/deleteUser')
  //update user
app.put('/api/updateUser')
  
//ENTRIES STUFF
  //gets the entry and all answer assosiated with it
app.get('/api/getEntry/:id/:user_id',entryController.getEntry)
app.get('/api/getEntryUpdater/:id',entryController.getEntryUpdater)
  //add entry returns the id so we can redirect to it
app.post('/api/addEntry',entryController.addEntry)
  //update an entry
app.put('/api/updateEntry/', entryController.updateEntry);
  //delete an entry
  //only a master contributor or an admi can delete
app.delete('/api/deleteEntry/:id');

app.put('/api/addEntryView/:auto_id',entryController.addEntryView);

//VOTE STUFF
app.post('/api/voter',voteController.voter,voteController.update_entry,voteController.update_comment)

app.get('/api/goSearch',searchController.goSearch)
app.get('/api/goSearchLabel',searchController.goSearchLabel)

app.post('/api/addReport',reportController.addReport);


//COMMENT STUFF
  //add a comment
app.post('/api/addAnswer',commentController.addComment)
app.post('/api/addReply',commentController.addReply)
  //delete comment
app.delete('/api/deleteComment')
  //edit comment
  app.put('/api/updateComment',commentController.updateComment)


  //NODE MAILER
  app.post('/api/updateNodeMailer/:user_id/:mailer',userController.nodeMailer)

  app.get('/api/sendMail',mailController.sendMail)

//AUTH STUFF
// app.post('/api/logout/', userController.logout);

app.get('/auth/callback',authController.setUser);

app.get('/api/getUser',authController.getUser);

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));