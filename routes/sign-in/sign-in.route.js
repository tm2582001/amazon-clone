const {Router} = require('express');
const router = Router();

const renderSignIn = require('../../controllers/sign-in/render-sign-in.controller');
const catchAsync = require('../../utils/catch-async/catch-async.util');
const verifyUser = require('../../controllers/sign-in/verify-user.controller');
const verifyPassword = require('../../controllers/sign-in/verify-password.controller');

router.route('/')
    .get(renderSignIn)
    .post(catchAsync(verifyUser));

router.post('/verifyPassword', catchAsync(verifyPassword));

module.exports = router;