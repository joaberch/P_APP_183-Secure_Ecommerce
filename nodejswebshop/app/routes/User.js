const express = require('express');
const router = express.Router();
const controller = require("../controllers/UserController");
const auth = require('../auth/auth');

router.get('/:user', auth, controller.get);

module.exports = router; 