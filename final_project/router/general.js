const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
    return user.username === username;
    });
    return userswithsamename.length > 0;
    };

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(400).json({ message: "User already exists!" });
        }
    }
});


// Get the book list available in the shop
/*
public_users.get('/', function (req, res) {
    return res.send(JSON.stringify({ books }, null, 4));
});
*/

public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/bs');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "An error occures!", error: error.message });
    }
});

// Get book details based on ISBN
/*public_users.get('/isbn/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    return res.status(200).json(books[isbn]);
});
*/
public_users.get('/isbn/:isbn',  async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/bs/isbn/'+req.params.isbn);
        res.status(200).json(response.data[isbn]);
    } catch (error) {
        res.status(500).json({ message: "An error occures!", error: error.message });
    }
});

// Get book details based on author
/*public_users.get('/author/:author', function (req, res) {
    let author = req.params.author;
    let selectedBook = [];

    Object.keys(books).forEach(function (key) {
        if (books[key].author === author) {
            selectedBook.push(books[key]);
        }
    });

    return res.status(200).json(selectedBook);
});*/

public_users.get('/author/:author',   async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/bs/author/'+req.params.author);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "An error occures!", error: error.message });
    }
});

// Get all books based on title
/*public_users.get('/title/:title', function (req, res) {
    let title = req.params.title;
    let selectedBook = [];

    Object.keys(books).forEach(function (key) {
        if (books[key].title === title) {
            selectedBook.push(books[key]);
        }
    });

    return res.status(200).json(selectedBook);
});*/

public_users.get('/title/:title',  async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/bs/title/'+req.params.title);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "An error occures!", error: error.message });
    }
});

//  Get book review
/*public_users.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    let booksreview = books[isbn].booksreview;
    if (!booksreview) {
        booksreview = [];
    }
    return res.status(200).json(booksreview);
});*/

public_users.get('/review/:isbn', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/bs/review/'+req.params.isbn);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "An error occures!", error: error.message });
    }
});


module.exports.general = public_users;
