const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    phnum: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        location: String,
        latitude: String,
        longitude: String,
    },
    userType: {
        type: String,
        required: true,
        enum: ['patient', 'ambulance', 'hospital'],
    },
    password: {
        type: String,
        required: true,
    },
    ambulanceIdle: {
        type: Boolean,
        default: true
    },
    patient: {
        bloodType: String,
        sex: String,
        age: Number,
    },
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

userSchema.statics.findAndValidate = async function (uid, password) {
    const foundUser = await this.findOne({ uid }).select("+password");
    //if a user is found, this means that the username is already in use
    if (!foundUser) return false;

    //if username is unique, then we will verify the password
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

module.exports = mongoose.model('User', userSchema); 