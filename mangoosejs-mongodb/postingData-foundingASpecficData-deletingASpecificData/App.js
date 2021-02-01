console.log("Hello from App.js")

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saadfarhan_1:saadfarhan_1@cluster0.yqrts.mongodb.net/demo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });



const db = mongoose.connection;
db.on('error', (err) => {
    console.log("404 Not Found", err)
});

db.once('open', () => {
    console.log("Connection successfull....")

    let CitySchema = new mongoose.Schema({
        population: Number,
        country: String,
        province: String,
        popularEvents: [String]
    })

    let CityModel = new mongoose.model('city', CitySchema)
    let City01 = new CityModel({ population: 100000, country: 'Country01', province: 'Province01', popularEvents: ['eve01', 'eve02', 'eve02'] })
    let City02 = new CityModel({ population: 10000, country: 'Country02', province: 'Province02', popularEvents: ['eve03', 'eve04', 'eve04'] })
    let City03 = new CityModel({ population: 1000, country: 'Country03', province: 'Province03', popularEvents: ['eve05', 'eve06', 'eve06'] })

        City01.save((err, doc) => {
            if (err) {
                console.log("ERROR")
            }
            console.log('City01 saved.')
        })
    
        CityModel.insertMany([City01, City02, City03], (err) => {
            if (err) {
                console.log("ERROR", err)
                return
            }
            console.log("Multiple DOCS saved.")
        })

    CityModel.find({country: 'Country03', population: {$ne: '10000000'}}, (err, docs) => {
        if (err) {
            console.log("ERROR")
        }
        console.log("Found", docs);
        let totalPopulation = 0;
        docs.forEach(doc => {
            totalPopulation += doc.population
        })
        console.log(`Total population ${totalPopulation}`)
    })
});

