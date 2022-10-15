const express = require('express');
const router = express.Router();
const searchItems = require('../../controllers/search/search.controller');
const catchAsync = require('../../utils/catch-async/catch-async.util');

router.route('/')
    .get(catchAsync(searchItems));


module.exports = router;