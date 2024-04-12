const User = require('../models/user');
const sendjwtToken = require('../utils/sendjwtToken');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    const { name, uid, phnum, email, userType, location, password } = req.body;

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
            location: location
        },
    });
    await user.save();

    sendjwtToken(user, 201, res);
}

module.exports.login = async (req, res, next) => {
    const { uid, password } = req.body;

    const user = await User.findAndValidate(uid, password);

    if (!user) {
        return next(new ErrorHand("Invalid uid or password", 404));
    }

    sendjwtToken(user, 200, res);
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