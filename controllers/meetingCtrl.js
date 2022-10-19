const twilio = require('twilio');

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
    const meeting = await db.Meeting.create(req.body);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.start = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await db.Meeting.findByPk(id);
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const twilioRoom = await client.video.v1.rooms.create({
      uniqueName: meeting.id,
      recordParticipantsOnConnect: false,
      emptyRoomTimeout: 10,
      maxParticipants: 10,
      type: 'group'
    });
    await meeting.update({
      twilio_sid: twilioRoom.sid
    });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.join = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await db.Meeting.findByPk(id);

    const { AccessToken } = twilio.jwt;
    const { VideoGrant } = AccessToken;
    const MAXIMUM_SESSION_DURATION = process.env.TWILIO_MAXIMUM_SESSION_DURATION;
    const accessToken = new AccessToken(process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      {
        ttl: MAXIMUM_SESSION_DURATION,
        identity: req.user.id,
      });
    const grant = new VideoGrant({
      room: meeting.id
    });
    accessToken.addGrant(grant);
    const authToken = accessToken.toJwt();
    res.render('meeting-view', {
      twilio_token: authToken,
      meeting,
      role: req.user.role,
    });
  } catch (err) {
    next(err);
  }
}
