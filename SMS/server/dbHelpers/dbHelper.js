const mongoose = require('mongoose');


module.exports.connectWithDB = () => {

    mongoose.connect('mongodb+srv://sample_user2:sample_user2@cluster0.gcuet.mongodb.net/sms?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.once('error', (err) => {
        console.log("Error in connecting to DB")
        console.log(err);
    });

    db.once('open', () => {
        console.log("Connected to DB successfully..!")
     })

}