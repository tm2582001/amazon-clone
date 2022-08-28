const express = require('express');
const router = express.Router();
const registerForm = require('../../controllers/register/register-form.controller');

router.route('/')
    .get(registerForm);




module.exports = router;
