const User = require('../models/user');


exports.isEmailExists = async (email) => {
    const user = await User.findOne({ email: email })
    console.log("user1 : " + user)
    if (!user) {
        console.log("user2 : " + user)
        return 0

    }
    return 1;
}