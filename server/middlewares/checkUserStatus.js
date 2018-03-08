module.exports = {
  checkUserStatus: (req, res, next) => {
    if (!req.session.user) {
      // req.session.user = { username: "Brandon", auto_id: 34 }
    }
    next();
  }
}