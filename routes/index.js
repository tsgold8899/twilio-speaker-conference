const express = require('express');

const { isAuthenticated, isAdmin, isAdminOrListener } = require('../middlewares/auth');

const authCtrl = require('../controllers/authCtrl');
const meetingCtrl = require('../controllers/meetingCtrl');

const router = express.Router();

router.post('/login', authCtrl.postLogin);
router.get('/login', authCtrl.login);
router.get('/logout', isAuthenticated, authCtrl.logout);

router.get('/', isAuthenticated, meetingCtrl.list);
router.get('/mt/new', isAdminOrListener, meetingCtrl.new);
router.post('/mt/create', isAdminOrListener, meetingCtrl.create);
router.post('/mt/:id', isAuthenticated, meetingCtrl.start);
router.get('/mt/:id', isAuthenticated, meetingCtrl.join);
router.post('/mt/:id/delete', isAdmin, meetingCtrl.delete);

module.exports = router;
