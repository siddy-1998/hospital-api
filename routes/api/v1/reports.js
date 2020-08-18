const express = require('express');
const router = express.Router();
const passport = require('passport');

const reportsApi = require('../../../controllers/api/v1/reports_api');

router.get('/:status',passport.authenticate('jwt',{session:false}) , reportsApi.reportStatus);


module.exports = router;