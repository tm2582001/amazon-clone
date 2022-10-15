const express = require('express');
const router = express.Router();
const searchItemsApi = require('../../controllers/search/search-api.controller');
const catchAsync = require('../../utils/catch-async/catch-async.util');

router.route('/')
    .get(catchAsync(searchItemsApi));


module.exports = router;