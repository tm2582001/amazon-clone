const express = require('express');
const router = express.Router();
const home = require('../../controllers/home/home.controller');

router.route('/')
    .get(home);

module.exports = router;