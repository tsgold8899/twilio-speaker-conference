const express = require('express');

const authCtrl = require('../controllers/authCtrl');

const router = express.Router();

router.post('/password', authCtrl.postLogin);
router.get('/login', authCtrl.login);

module.exports = router;
