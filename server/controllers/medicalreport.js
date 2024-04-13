const MedicalReport = require('../models/medicalreport');
const cloudinary = require('cloudinary');
const User = require('./user');
const { json } = require('body-parser');

module.exports.uploadReport = async (req, res, next) => {
    const { from, to, date, reportType } = req.body;

    

    const { file } = req.files;
    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }

    const result = await cloudinary.uploader.upload(file.path, {
        folder: 'pdfs' // Specify the folder in Cloudinary where you want to store PDFs
    });

    console.log(result.secure_url);
    res.json({ url: result.secure_url });

    const parsedData = JSON.stringify({form,to,date,reportType});

    const medicalreport = new MedicalReport({
        hospitalId: parsedData.form,
        patientId: parsedData.to,
        date: parsedData.date,
        reportType: parsedData.reportType,
        url: result.secure_url
    })

    medicalreport.save();

    if (from != to) {
        const fromUser = await User.findById(from);
        const toUser = await User.findById(to);
        fromUser.reports.push(medicalreport.id);
        toUser.reports.push(medicalreport.id);
        fromUser.save();
        toUser.save();
    }
    else {
        const toUser = await User.findById(to);
        toUser.reports.push(medicalreport.id);
        toUser.save();
    }

    res.status(200).json({
        status: true,
        data: { ...medicalreport }
    })
}


