const express = require('express');

const { isAuthenticated } = require('../middlewares/auth');

const authCtrl = require('../controllers/authCtrl');
const meetingCtrl = require('../controllers/meetingCtrl');

const router = express.Router();

router.post('/login', authCtrl.postLogin);
router.get('/login', authCtrl.login);
router.get('/logout', isAuthenticated, authCtrl.logout);

router.get('/', isAuthenticated, meetingCtrl.list);
router.get('/mt/new', isAuthenticated, meetingCtrl.new);
router.post('/mt/create', isAuthenticated, meetingCtrl.create);
router.post('/mt/:id', isAuthenticated, meetingCtrl.start);
router.get('/mt/:id', isAuthenticated, meetingCtrl.join);
router.delete('/mt/:id', isAuthenticated, meetingCtrl.delete);

module.exports = router;
