const express = require('express');
const cors = require('cors');
const userRoutes = require('./modules/users/userRoutes.js');
const blogRoutes = require('./modules/blog/blog-routes');
const dbHelper = require('./dpHelpers/dpHelper');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;
const session = require('express-session');
var multer  = require('multer')
var upload = multer({})

app.use(session({
    secret: 'Hi', resave: false,
    saveUninitialized: true
}))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/blogs', upload.single('headerImage'), blogRoutes)
app.use('/users', userRoutes)

app.listen(port, (err) => {
    if (err) {
        console.log("Error", err)
        return;
    }
    console.log("Server started....")
    dbHelper.connectionWithDB();
})