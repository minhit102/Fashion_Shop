const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');


dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connetDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/fashionshop')
            .then(() => console.log('Connected!'));

    } catch (error) {
        console.log(error)
    }
}
connetDb()

const RouterAuth = require('./src/router/authRouter')
app.use('/api/auth', RouterAuth);


app.get('/', async (req, res) => {
    console.log("Minh")
    res.status(200).json({ "minh": "Minh" });
})
app.listen(5500, () => {
    console.log('Run')
})