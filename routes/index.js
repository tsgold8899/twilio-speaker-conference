const express = require('express');

const { isAuthenticated } = require('../middlewares/auth');

const authCtrl = require('../controllers/authCtrl');
const meetingCtrl = require('../controllers/meetingCtrl');

const router = express.Router();

router.post('/login', authCtrl.postLogin);
router.get('/login', authCtrl.login);
router.get('/logout', isAuthenticated, authCtrl.logout);

router.get('/', isAuthenticated, meetingCtrl.list);
router.get('/meetings/new', isAuthenticated, meetingCtrl.new);
router.post('/meetings/create', isAuthenticated, meetingCtrl.create);
router.post('/meetings/:id', isAuthenticated, meetingCtrl.start);
router.get('/meetings/:id/join', isAuthenticated, meetingCtrl.join);

module.exports = router;
