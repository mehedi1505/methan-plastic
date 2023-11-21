const mongoose = require('mongoose');

    module.exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewURLParser: true })
        .then(() => {console.log("Connected to Database");})
        .catch((err) => { console.log("Not Connected to Database ERROR! ", err);});
        // console.log("database connected....")
    } catch (error) {
        console.log(error.message)
    }
}
