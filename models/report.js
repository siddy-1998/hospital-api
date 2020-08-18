//Importing Mongoose
const mongoose = require('mongoose');

//creating a new Schema 
const reportSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }

}, {
    timestamps: true
});

//tell mongoose to use this schema as Report
const Report = mongoose.model('Report', reportSchema);

//export the model
module.exports = Report;