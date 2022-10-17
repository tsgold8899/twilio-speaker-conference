const db = require('../models');
exports.list = async (req, res, next) => {
  const meetings = await db.Meeting.findAll();
  res.render('meeting-list', {
    meetings
  });
};

exports.new = async (req, res, next) => {
  res.render('meeting-new');
};

exports.create = async (req, res, next) => {
  try {
    const meeting = await db.Meeting.create({
      // TODO: fields
    });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.startOrJoin = async (req, res, next) => {
  try {
    // TODO: twilioId
  } catch (err) {
    next(err);
  }
}
