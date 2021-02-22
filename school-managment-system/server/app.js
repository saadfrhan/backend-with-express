const express = require('express')
const app = express();
const port = 9000;
const cors = require('cors')
const bodyParser = require('body-parser')
const studentRoutes = require('./modules/students/studentRoutes')
const subjectsRoutes = require('./modules/subjects/subjectRoutes');
const { connectionWithDB } = require('./dpHelpers/dpHelper');

app.use(bodyParser.json())

app.use(cors())
app.use('/subjects', subjectsRoutes)
app.use('/students', studentRoutes)
app.listen(port, (err) => {
    if (err) {
        console.log(`ERROR ${err}`)
        return;
    }
    console.log("Server started...")
    connectionWithDB()
})