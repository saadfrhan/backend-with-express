const bodyParser = require('body-parser');
const express = require('express')
const session = require('express-session')
const app = express();
const port = 9000;
var users = [
    { email: 'user@example.com', pass: '123456', name: 'user 01' },
    { email: 'user@example.com', pass: '12345', name: 'user 02' },
    { email: 'user@example.com', pass: '1234', name: 'user 03' },
    { email: 'user@example.com', pass: '123', name: 'user 04' },
]
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './HTMLFiles')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    if (!req.session.isAuthenticated) {
        res.redirect('/login')
        return;
    }
    console.log(req.session)
    res.render('dashboard', { displayName: req.session.user.name })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    let creds = { email: req.body.email, password: req.body.pass };
    let matchingUser = users.find((u) => (u.email === creds.email && u.pass === creds.password))
    if (!matchingUser) {
        res.redirect('/login')
        return;
    }
    req.session.isAuthenticated = true;
    req.session.user = matchingUser;
    res.redirect('/')
})

app.get('/logout' ,(req, res) => {
    req.session.destroy();
    res.send('<h1>You have been logged out....</h1>')
})
app.listen(port, (err) => {
    if (err) {
        console.log(`ERROR ${err}`)
        return;
    }
    console.log(`Server is running in localhost:${port}`)
})