const express = require('express');
let books = require("./booksdb.js");
const bookStoreRouter = express.Router();

// Get the book list available in the shop
bookStoreRouter.get('/', function (req, res) {
    return res.send(JSON.stringify({ books }, null, 4));
});

// Get book details based on ISBN
bookStoreRouter.get('/isbn/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    return res.status(200).json(books[isbn]);
});

// Get book details based on author
bookStoreRouter.get('/author/:author', function (req, res) {
    let author = req.params.author;
    let selectedBook = [];

    Object.keys(books).forEach(function (key) {
        if (books[key].author === author) {
            selectedBook.push(books[key]);
        }
    });

    return res.status(200).json(selectedBook);
});

// Get all books based on title
bookStoreRouter.get('/title/:title', function (req, res) {
    let title = req.params.title;
    let selectedBook = [];

    Object.keys(books).forEach(function (key) {
        if (books[key].title === title) {
            selectedBook.push(books[key]);
        }
    });

    return res.status(200).json(selectedBook);
});

//  Get book review
bookStoreRouter.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    let booksreview = books[isbn].booksreview;
    if (!booksreview) {
        booksreview = [];
    }
    return res.status(200).json(booksreview);
});

module.exports.book_store = bookStoreRouter; 
