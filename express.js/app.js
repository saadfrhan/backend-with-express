const express = require('express')
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log(`Reveived request at ` + Date());
    res.send("<h2>Home</h2>")
})

app.get("/add", (req, res) => {
    res.send(`<label>
    Add user:
    </label>
    <button>
    Add user
    </button>`)
})

app.listen(port, (err) => {
    if (err) {
        console.log("ERROR 404 NOT FOUND")
        console.log(err)
    } else {
        console.log(`Server lisitng on ${port}`)
    }
})