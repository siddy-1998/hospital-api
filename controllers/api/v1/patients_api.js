const Patient = require('../../../models/patient');
const Report = require('../../../models/report');

//register patient
module.exports.register = async function (req, res) {

    console.log(req.body);

    if (req.body == undefined || req.body.phone == undefined || req.body.phone.length == 0) {
        return res.status(200).json({
            "message": "Cannot register patient without Phone number!"
        });
    }

    try {
        
        let patient = await Patient.findOne({"phone": req.body.phone });

        if (patient) {
            return res.status(200).json({
                "message": "Patient is already registered"
            });
            
        } else {
            let newPatient = await Patient.create(req.body);
            if (newPatient) {
                return res.status(200).json({
                    "message": "New Patient Registered"
                });

            }
        }
    } catch (err) {
        return res.status(500).send({
            "message": "Internal Server Error"
        });
    }
}

//this function creates the report of a particular Patient by an Authorized doctor
module.exports.createReport = async function (req, res) {
    const id = req.params.id;
    console.log(req.body);
    if (!req.body.status || req.body.status.length == 0) {
        return res.status(422).json({
            "message": "Please enter the status of report"
        });
    }

    try {
        let patient = await Patient.findOne({"phone": id });

        if (!patient) {
            return res.status(200).json({
                "message": "No such Patient"
            });
        } else {
            let newReport = await Report.create({
                "doctorName": req.user.username,
                "status": req.body.status,
                "patient": patient._id
            });

            patient.report.push(newReport);
            patient.save();
            return res.status(200).json({
                "message": "New Report created"
            });
        }
    } catch (err) {
        if (err) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    }
}

//this function returns all the reports of a particular Patient
module.exports.allReports = async function (req, res) {
    const id = req.params.id;
    try {
        let patient = await Patient.findOne({
            "phone": id
        });
        if (!patient) {
            return res.status(200).json({
                "Message": "No such user exists"
            });
        } else {

            if (!patient.report || patient.report.length == 0) {
                return res.status(200).json({
                    "Message": "No reports yet!"
                });
            }

            const allreports = [];
            for (let i = 0; i < patient.report.length; i++) {
                let oneReport = await Report.findById(patient.report[i]);
                let yr = oneReport.date.getFullYear();
                let mon = oneReport.date.getMonth()+1 + '-';
                let day = oneReport.date.getDate() + '-';
                let date = day.concat(mon,yr);
                allreports.push({
                    "Doctor's Name": oneReport.doctorName,
                    "Status Of Covid-19": oneReport.status,
                    "Report Created On": date
                });
            }

           // console.log(allreports);
            return res.status(200).json(allreports);
        }

    } catch (err) {
        if (err) {
            return res.status(500).json({
                "message": "Internal server error"
            });
        }
    }
}