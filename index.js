const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connetDb = require('./src/config/connectDB')


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
connetDb.connetDb()
app.use('/api/uploads', express.static(path.join(__dirname, 'src/uploads')));





const AuthRouter = require('./src/router/authRouter');
const ProductRouter = require('./src/router/productRouter')
app.use('/api/auth', AuthRouter);
app.use('/api/product', ProductRouter);
app.get('/', async (req, res) => {
    console.log("Minh")
    res.status(200).json({ "minh": "Minh" });
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Run')
})