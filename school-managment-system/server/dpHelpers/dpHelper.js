const mongoose = require('mongoose');

module.exports.connectionWithDB = () => {
    mongoose.connect('mongodb+srv://saadfarhan_1:saadfarhan_1@cluster0.yqrts.mongodb.net/sms?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });



    const db = mongoose.connection;
    db.on('error', (err) => {
        console.log("404 Not Found", err)
    });

    db.once('open', () => {
        console.log("Connection successfull....")
    })
}