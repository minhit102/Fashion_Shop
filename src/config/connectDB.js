const mongoose = require('mongoose');
exports.connetDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
            .then(() => console.log('Connected!'));

    } catch (error) {
        console.log(error)
    }
}