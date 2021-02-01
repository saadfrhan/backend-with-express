const bodyParser = require('body-parser');
const express = require('express');
const { requestLogger } = require('../../middlewares/requestLogger');
const app = express();
const port = 7000;
let userName = "Taha";

var blog = [
    {
        title: "Article 01", author: "Author 01", createdOn: new Date()
    },
    {
        title: "Article 01", author: "Author 01", createdOn: new Date()
    },
    {
        title: "Article 02", author: "Author 02", createdOn: new Date()
    },
    {
        title: "Article 03", author: "Author 03", createdOn: new Date()
    },
    {
        title: "Article 04", author: "Author 04", createdOn: new Date()
    },
    {
        title: "Article 05", author: "Author 05", createdOn: new Date()
    },
]

app.set('views', './views');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(requestLogger)
app.use(express.static('public'))

app.get('/article/get-all', (req, res) => {
    res.send(blog)
})

app.get('/article/get-count', (req, res) => {
    res.send(blog)
})

app.get('/article/get-create', (req, res) => {
    res.render('./index.ejs', {})
})

app.post('/article/get-create', (req, res) => {
    blog.push({ title: req.body.title, author: req.body.author, createdOn: new Date() })
    res.send(blog)
})

app.get('/article/list', (req, res) => {
    res.render('./list', { userName: userName, articles: blog })
})

app.listen(port, (err) => {
    if (err) {
        console.log("Error 404")
        console.log(err)
        return;
    }
    console.log("Server running...")
})