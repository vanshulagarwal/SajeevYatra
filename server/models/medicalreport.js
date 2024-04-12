const mongoose = require('mongoose');

const MedicalReportSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    doctorName: String,
    date: {
        type: Date,
        required: true
    },
    url: String,
    reportType: {
        type: String,
        enum: ['prescription', 'report'],
    }
})

module.exports = mongoose.model('MedicalReport', MedicalReportSchema);