exports.list = (req, res, next) => {
  console.log(req.session.user);
  res.render('meeting-list');
};
