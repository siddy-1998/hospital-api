const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

const mongoose = require('mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(express.urlencoded());

//use express router
app.use('/',require('./routes'));

//Server listening to request
app.listen(port, function (err) {
    if (err) {
        return console.log(`Error in running the server : ${err}`);
    }
    console.log(`App running on port ${port}`);
})