const express = require('express');
const { addNewBook, getAllBooks } = require('./library');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    console.log(`Reveived request at ` + Date());
    res.send("<h2>Home</h2>")
})

app.get("/add", (req, res) => {
    res.send(`
    <label>
        Add user:
    </label>
    <button>
        Add user
    </button>`)
})

app.post("/add-book-success", (req, res) => {
    let newBook = {
        bookName: req.body.bookName,
        lang: req.body.lang,
        id: Date.now(),
        author: getRandomAuthor()
    }
    addNewBook(newBook)
    res.send(`
    <h1>
        Your book has been registered.
    </h1>
    <div>
        Would you <a href='/add-new-book'>like to add another book?</a>
        Would you <a href='/list-all-books'>like to view all books?</a>    
    </div>
    `)
})

app.get("/list-all-books", (req, res) => {
    let booksAddedYet = getAllBooks()
    let bookListStr = '<ul>'
    booksAddedYet.forEach(b => {
        bookListStr += `<li> <b>${b.bookName}</b> by ${b.author} </li>`
    })
    bookListStr += '</ul>'
    res.send(bookListStr)
})

app.get("/add-new-book", (req, res) => {
    res.send(`
    <form action="/add-book-success" method="post">
        <label>
            Bookname: <input type="text" name = "bookName" />
        </label>
        <label>
            Language: <input type="text" name = "lang" />
        </label>
        <button type="submit">
            Add book
        </button>
    </form>`)
})

app.listen(port, (err) => {
    if (err) {
        console.log("ERROR 404 NOT FOUND")
        console.log(err)
    } else {
        console.log(`Server lisitng on ${port}`)
    }
})

function getRandomAuthor() {
    const authors = ["Author1", "Author2", "Author3"]
    let index = Math.floor(Math.random() * authors.length)
    return authors[index]
}