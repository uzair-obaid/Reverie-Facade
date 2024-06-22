const express = require('express');
const auth = require('../controllers/auth');

const router = express.Router();

router.post('/', auth.signup);
router.get('/', auth.login);

module.exports = router;