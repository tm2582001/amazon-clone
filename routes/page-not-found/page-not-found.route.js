const express = require('express');
const router = express.Router();
const pageNotFound = require('../../controllers/page-not-found/page-not-found.controller');

router.route('*pageNotFound')
    .all(pageNotFound);

module.exports = router;