const express = require('express');
const test = require('../controllers/test');

const router = express.Router();

router.post('/', test.save);


module.exports = router;