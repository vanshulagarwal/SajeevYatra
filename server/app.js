if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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

app.get('/', (reeq, res, next) => {
    res.send("hello");
})

port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})