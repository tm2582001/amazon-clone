const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catch-async/catch-async.util');
const renderRegister = require('../../controllers/register/render-register.controller');
const registerUser = require('../../controllers/register/resgister-user.controller');

router.route('/')
    .get(renderRegister)
    .post(catchAsync(registerUser));




module.exports = router;
