const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connetDb = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/Booking')
      .then(() => console.log('Connected!'));
    
    }catch(error){
        console.log(error)
    }
}
connetDb()


const RouterUser =  require('./src/router/userRouter')
const RouterHotel =  require('./src/router/hotelRouter')
const RouterAuth = require('./src/router/authRouter')
app.use('/api/user', RouterUser);
app.use('/api/hotel', RouterHotel);
app.use('/api/auth',RouterAuth)
app.get('/' , async (req,res) => {
    console.log("Minh")
    res.status(200).json({"minh" : "Minh"});
})
app.listen(8800 , () => {
    console.log('Run')
})