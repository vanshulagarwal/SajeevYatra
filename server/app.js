if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const formData = require('express-form-data');

const userRoutes = require('./routes/user');
const medicalReportRoutes = require('./routes/medicalreport');
const errorMiddleware = require('./middlewares/error');

const dbUrl = process.env.ATLAS_URL || 'mongodb://127.0.0.1:27017/SanjeevYatra';
mongoose.connect(dbUrl)
    .then(() => {
        console.log('mongo database connected');
    })
    .catch((err) => {
        console.log('mongo connection error!!');
        console.log(err);
    })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(formData.parse());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get('/', (req, res, next) => {
    res.send("hello");
})

app.use('/api/v1/', userRoutes);
app.use('/api/v1/', medicalReportRoutes);

app.use(errorMiddleware);

port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})