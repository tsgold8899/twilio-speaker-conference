const express = require('express');

const { isAuthenticated, isAdmin, isAdminOrListener } = require('../middlewares/auth');

const authCtrl = require('../controllers/authCtrl');
const meetingCtrl = require('../controllers/meetingCtrl');
const userCtrl = require('../controllers/userCtrl');

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

router.get('/usr', isAdmin, userCtrl.list);
router.get('/usr/new', isAdmin, userCtrl.new);
router.post('/usr/create', isAdmin, userCtrl.create);
router.get('/usr/:id', isAdmin, userCtrl.get);
router.post('/usr/:id', isAdmin, userCtrl.update);
router.post('/usr/:id/delete', isAdmin, userCtrl.delete);

module.exports = router;
