const express = require('express')
const session = require('express-session')
const app = express();
const port = 9000;
app.use(session({ secret: 'SECRET' }));

app.get('/', (req, res) => {
    console.log(req.session);
    res.send({ message: 'Sample 01' })
})

app.get('/view-details', (req, res) => {
    console.log(req.session);
    if (!req.session.views) {
        req.session.views = 0;
    }
    req.session.views++;
    res.send(`
        <h1>Views ${req.session.views}</h1>
    `)
})

app.listen(port, (err) => {
    if (err) {
        console.log(`ERROR ${err}`)
        return;
    }
    console.log(`Server is running in localhost:${port}`)
})