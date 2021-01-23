const books=[];

function addNewBook(bookDetails) {
    books.push(bookDetails)
}

function getAllBooks() {
    return(books)
}

module.exports.addNewBook = addNewBook;
module.exports.getAllBooks = getAllBooks;