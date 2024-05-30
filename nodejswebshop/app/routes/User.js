const express = require('express');
const router = express.Router();
const controller = require("../controllers/UserController");

router.get('/:user', controller.get);

module.exports = router; 