const express = require('express');
const router = express.Router();

const doctorsApi = require('../../../controllers/api/v1/doctors_api')

router.post('/register', doctorsApi.register);
router.get('/login', doctorsApi.login);



module.exports = router;