const express = require('express');
const router = express.Router();
const passport = require('passport');

const patientsApi = require('../../../controllers/api/v1/patient_api');

router.post('/register', passport.authenticate('jwt', { session: false }),patientsApi.register);
router.post('/:id/create_report', passport.authenticate('jwt', { session: false }), patientsApi.createReport);
router.post('/:id/all_reports', patientsApi.allReports);

module.exports = router;