const axios = require('axios');

module.exports = {
  getLandingEntries: (req, res) => {
    const db = req.app.get('db');
    let obj = {};
    
    db.get_landing_entries()
      .then(e => res.status(200).send(e))
      .catch(err => console.log(err));
  }

}