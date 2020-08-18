const Doctor =  require('../../../models/doctor');
const jwt = require('jsonwebtoken');

//for registering doctor
module.exports.register = async function (req, res) {
    console.log(req.body);
    if (req.body == undefined || req.body.username == undefined || req.body.username.length == 0 || !req.body.password) {
        return res.status(200).json({
            "message": "Please set valid username and password"
        });
    
    }
   
    try {
        let doctor = await Doctor.findOne({"username": req.body.username });

        if (doctor) {
            return res.status(200).json({
                "message": "This username already exists, try something new"
            });
            
        } else {
            
            let newDoctor = await Doctor.create(req.body);
            if (newDoctor) {
                return res.status(200).json({
                    "message": "New Doctor registered"
                });
            }
        }
    } catch (err) {
        if (err) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    }

}

//for signing in the doctor
module.exports.login = async function (req, res) {
    try {
            let doctor = await Doctor.findOne({"username": req.body.username});

            if (!doctor || doctor.password != req.body.password) 
            {
                return res.status(422).json({
                    "message": "Invalid username or password"
                    });
            } 
            
            res.status(200).json({
                "message": "Signed in Successfully",
                "token": jwt.sign(doctor.toJSON(), 'hospitalAPI', { expiresIn: 1000000 })
            });
            
        }
        catch (err) {
            if (err) {
                return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    }
}