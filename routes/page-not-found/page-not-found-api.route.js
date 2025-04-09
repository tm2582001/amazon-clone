const express = require('express');
const router = express.Router();
const pageNotFoundApi = require('../../controllers/page-not-found/page-not-found-api.controller');

router.route('*apiNotFound')
    .all(pageNotFoundApi);

module.exports = router;