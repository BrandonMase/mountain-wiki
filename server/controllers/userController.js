module.exports = {
  getUserStatus:(req, res) =>{
    res.status(200).send(req.session)
  }
}