exports.createUser = async (req , res ) => {
    res.status(200).json({
        "name" : "Hoang Trong Minh",
        "class" : "IT1-02"
    })
}