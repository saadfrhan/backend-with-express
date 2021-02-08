const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const dbHelper = require("./dbHelpers/dbHelper")

const port = 9000;

const subjectsRoutes = require('./modules/subjects/subjectRoutes');
const studentRoutes = require('./modules/students/studentRoutes');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors())
app.use('/subjects', subjectsRoutes)
app.use('/students', studentRoutes)

app.listen(port, (err) => {
    if (err) {
        console.log("Error in starting the server", err);
        return;
    }

    console.log("Server started..!");
    dbHelper.connectWithDB()
})