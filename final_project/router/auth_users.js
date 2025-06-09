const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const registered_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => {
    let validusers = users.filter((user) => {
        return user.username === username && user.password === password;
    });
    return validusers.length > 0;
}

//only registered users can login
registered_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(401).json({ message: "Missing user credentinal parameters!" });
    }
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 });
        req.session.authorization = {
            accessToken, username
        };
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(401).json({ message: "Invalid credentinal!" });
    }

});

// delete a book review
registered_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    let booksreview = books[isbn].booksreview;

    let reviewList = booksreview.filter((review) => {
        return review.user !== req.user;
    });

    if (booksreview.length === reviewList.length) {
        return res.status(400).json({ message: "User have not any review!" });
    } else {
        books[isbn].booksreview = reviewList;
        return res.status(200).json({ message: "Review is removed!" });
    }
});

// Add a book review
registered_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    let booksreview = books[isbn].booksreview;
    if (!booksreview) {
        booksreview = [];
    }

    let reviewList = booksreview.filter((review) => {
        return review.user !== req.user;
    });

    reviewList.push({ "user": req.user, "review": review });
    books[isbn].booksreview = reviewList;

    return res.status(200).json({ message: "Review is submited!" });
});

module.exports.authenticated = registered_users;
module.exports.isValid = isValid;
module.exports.users = users;
