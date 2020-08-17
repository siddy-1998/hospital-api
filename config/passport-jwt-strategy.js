const passport = require('passport');
//import strategy
const JWTStrategy = require('passport-jwt').Strategy;
//helps in extracting jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hospitalAPI'
}

//tell passport to use JWT Strategy
passport.use(new JWTStrategy(opts, function (jwtPayload, done) {

    Doctor.findById(jwtPayload._id, function (err, doc) {
        if (err) {
            console.log('Error in finding doctor from JWT');
            return
        }

        if (doc) {
            return done(null, doc);
        } else {
            return done(null, false);
        }
    })
}));

module.exports = passport;