//Importing Mongoose
const mongoose = require('mongoose');

//creating the Patient Schema
const patientSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    // include history of reports of perticular patient
    // array of ids of report
    report: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }]
}, {
    timestamps: true
});

//tell mongoose to use the schema as Patient
const Patient = mongoose.model('Patient', patientSchema);

//exporting schema
module.exports = Patient;