const express = require('express');
const journal = require('../controllers/journal');

const router = express.Router();

router.post('/', journal.save);


module.exports = router;