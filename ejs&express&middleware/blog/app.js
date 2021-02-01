const express = require('express')
const app = express();
const port = 7000;

var blog = [
    { title: "Article 01", author: "Author 01", createdOn: new Date() },
    { title: "Article 01", author: "Author 01", createdOn: new Date() },
    { title: "Article 02", author: "Author 02", createdOn: new Date() },
    { title: "Article 03", author: "Author 03", createdOn: new Date() },
    { title: "Article 04", author: "Author 04", createdOn: new Date() },
    { title: "Article 05", author: "Author 05", createdOn: new Date() },
]

function middleWare(req, res, next) {
        console.log("Inside Middleware")
        setTimeout(()=>{
            next();
        }, 1)
}

app.use(middleWare)
function requestLogger(req, res, next) {
    console.log(`Recevied request for ${req.url}`)
    next();
}
function requestReceivingTime(req, res, next) {
    req.receivingTime = new Date();
    console.log(req.receivingTime)
    next();
}
app.use(requestLogger, requestReceivingTime, requestReceivingTime)
app.get('/article/get-all', (req, res) => {
    res.send(blog)
})

app.get('/article/get-count', (req, res) => {
    res.send({ count: blog.length })
})

app.get('/article/get-create', (req, res) => {
    let count = blog.length + 1
    blog.push({ title: `Article 0${count}`, author: `Author 0${count}`, createdOn: new Date() })
    res.send({ count: blog.length })
})

app.listen(port, (err) => {
    if (err) {
        console.log("Error 404")
        console.log(err)
        return;
    }
    console.log("Server running...")
})