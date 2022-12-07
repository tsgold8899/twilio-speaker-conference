const twilio = require('twilio');
const { USER_ROLES } = require('../config/constants');

const db = require('../models');
exports.list = async (req, res, next) => {
  const where = {};
  if (req.user.role === 'speaker') {
    where.speaker_id = req.user.id;
  }
  const meetings = await db.Meeting.findAll({
    where,
    include: [
      db.Meeting.Speaker,
    ],
    order: [['created_at', 'desc']],
  });
  res.locals.req = req;
  res.render('meeting-list', {
    meetings
  });
};

exports.new = async (req, res, next) => {
  try {
    const { Op } = db.Sequelize;

    const speakers = await db.User.findAll({
      where: {
        archived: { [Op.ne]: true },
        role: USER_ROLES.SPEAKER,
      },
    });
    res.locals.req = req;
    res.render('meeting-new', {
      speakers
    });
  } catch (err) {
    next(err);
  }
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
    if (!meeting.twilio_sid) {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      const twilioRoom = await client.video.v1.rooms.create({
        uniqueName: meeting.id,
        recordParticipantsOnConnect: false,
        emptyRoomTimeout: 10,
        maxParticipants: 10,
        type: 'group'
      });
      await meeting.update({
        twilio_sid: twilioRoom.sid,
        twilio_room_name: twilioRoom.uniqueName,
        twilio_room_created_at: new Date,
      });
    }
    res.redirect(`/mt/${id}`);
  } catch (err) {
    next(err);
  }
};

exports.join = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await db.Meeting.findByPk(id, {
      include: [
        db.Meeting.Speaker,
      ],
    });
    if (!meeting) {
      res.status(404).send('Not Found');
    }
    let authToken = '';
    let twilioRoom = {};
    if (meeting.twilio_sid) {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      twilioRoom = await client.video.v1.rooms(meeting.twilio_sid).fetch();
      if (twilioRoom.status !== 'completed') {
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
        authToken = accessToken.toJwt();
      }
    }
    res.locals.req = req;
    res.render('meeting-view', {
      twilio_token: authToken,
      meeting,
      twilioRoom,
      role: req.user.role,
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await db.Meeting.findByPk(id);
    await meeting.destroy();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
