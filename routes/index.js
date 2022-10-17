const express = require('express');

const authCtrl = require('../controllers/authCtrl');

const router = express.Router();

router.get('/login', authCtrl.login);
router.post('/login/password', authCtrl.postLogin);

module.exports = router;
