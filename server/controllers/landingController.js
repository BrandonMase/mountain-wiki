const axios = require('axios');

module.exports = {
  getLandingEntries: (req, res) => {
    const db = req.app.get('db');
    let obj = {};
    
    console.log('\x1b[41m', 'I am cyan');
    db.get_landing_entries()
      .then(e => res.status(200).send(e))
      .catch(err => console.log(err));
  }

}