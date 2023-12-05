const mongoose = require('mongoose');

    module.exports.dbConnect = async () => {
     try {
        if(process.env.MODE === 'pro'){
            await mongoose.connect(process.env.DB_PRO_URL, {useNewURLParser: true})
            .then(() => {console.log("Connected to Production Database");})
            .catch((err) => { console.log("Not connected to database ERROR! ", err);});
        }else{
            await mongoose.connect(process.env.DB_LOCAL_URL, {useNewURLParser: true})
            .then(() => {console.log("Connected to local Database");})
            .catch((err) => { console.log("Not connected to database ERROR! ", err);});
        }
    } catch (error) {
        console.log(error.message)
    }
}
