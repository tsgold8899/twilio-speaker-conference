const express = require('express');

const { isAuthenticated } = require('../middlewares/auth');

const authCtrl = require('../controllers/authCtrl');
const meetingCtrl = require('../controllers/meetingCtrl');

const router = express.Router();

router.post('/login', authCtrl.postLogin);
router.get('/login', authCtrl.login);
router.get('/logout', isAuthenticated, authCtrl.logout);

router.get('/', isAuthenticated, meetingCtrl.list)

module.exports = router;
