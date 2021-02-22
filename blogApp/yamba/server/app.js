const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;
const blogRoutes = require('./modules/blog/blog-routes')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/blogs', blogRoutes)

app.listen(port, (err) => {
    if(err){
        console.log("Error", err)
    }
    console.log("Server started....")
})