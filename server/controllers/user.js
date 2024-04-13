const User = require('../models/user');
const ErrorHand = require('../utils/errorhand');
const sendjwtToken = require('../utils/sendjwtToken');
const bcrypt = require('bcrypt');
const MedicalReport = require('../models/medicalreport');
const cloudinary = require('cloudinary');



module.exports.register = async (req, res, next) => {
    const { name, uid, phnum, email, userType, location, password, latitude, longitude } = req.body;

    const foundUser = await User.findOne({ uid: uid });

    if (foundUser) {
        return res.status(200).json({
            success: true,
            error: "User already exists"
        })
    }

    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        name,
        email,
        phnum,
        password: hash,
        uid,
        userType,
        address: {
            location: location,
            latitude: latitude,
            longitude: longitude
        },
    });
    await user.save();

    sendjwtToken(user, 201, res);
    res.status(200).json({
        success: true,
        message: user,
    });
}

module.exports.login = async (req, res, next) => {
    const { uid, password } = req.body;

    const user = await User.findAndValidate(uid, password);

    if (!user) {
        return next(new ErrorHand("Invalid uid or password", 404));
    }

    sendjwtToken(user, 200, res);
    res.status(200).json({
        success: true,
        message: user,
    });
}

module.exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'None',
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
}

module.exports.dashboarddata = async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: req.user
    })
}


// module.exports.uploadReport = async (req, res) => {
//     const {uid, date, reportType, file} = req.body;
//     console.log(req.files);

//     if (!file) {
//         return res.status(400).json({
//             success: false,
//             message: 'No file uploaded'
//         });
//     }


//     const user = await User.findById(uid);

    
//     if (!user) {
//         return res.status(400).json({
//             success: false,
//             message: 'User not found'
//         });
//     }

//     const result = await cloudinary.uploader.upload(file.path, {
//         folder: 'pdfs' // Specify the folder in Cloudinary where you want to store PDFs       
//     });

//     const medicalreport = new MedicalReport({
//         patientId: uid,
//         date: date,
//         reportType: reportType,
//         url: result.secure_url
//     })

//     medicalreport.save();
//     user.reports.push(medicalreport.id);
//     user.save();

//     res.status(200).json({
//         success: true,
//         data: { ...medicalreport }
//     })


// }




