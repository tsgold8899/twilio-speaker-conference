exports.list = (req, res, next) => {
  console.log(req.user);
  res.render('meeting-list');
};
