const express = require('express');
const router = express.Router();

// make sure root index of routes knows about api
router.use('/api',require('./api'));

module.exports = router;