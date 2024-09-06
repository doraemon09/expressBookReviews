const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const this_username = req.body.username;
    const this_password = req.body.password;

    if(this_username && this_password) {
        if(!isValid(this_username)) {
            users.push({
                "username": this_username
                , "password": this_password
            });
            return res.status(200).json({message: "User registered successfully. You can now login!"});
        } else {
            return res.status(404).json({message: "Error with login!"});
        };
    };

    return res.status(404).json({message: "Unable to register user!"});

    /*
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username, password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
    */
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    const this_promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(books), 500);
    });

    this_promise.then((this_result) => {
        return res.status(200).json({ books: this_result });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
    const this_isbn = req.params.isbn;

    const this_promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(books[this_isbn]), 500);
    });

    const this_book = await this_promise;

    if (this_book) {
        return res.status(200).json({ book });
    } else {
        return res.status(404).json({ message: "Book for this isbn not found" });
    }
});
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
    const this_author = req.params.author;
    const this_promise = new Promise((resolve, reject) => {
        setTimeout(() => {
        const filtered_books = Object.values(books).filter(
            (this_book) => this_book.author === this_author
        );
        resolve(filtered_books);
        }, 500);
    });

    const filtered_books = await this_promise;

    if (filtered_books.length > 0) {
        return res.status(200).json({ books: filtered_books });
    } else {
        return res.status(404).json({ message: "Book for this author not found!" });
    };
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
    const this_title = req.params.title;

    const this_promise = new Promise((resolve, reject) => {
        setTimeout(() => {
        const filtered_books = Object.values(books).filter(
            (this_book) => this_book.title === this_title
        );
        return resolve(filtered_books);
        }, 500);
    });

    const filtered_books = await this_promise;

    if (filtered_books.length > 0) {
        return res.status(200).json({ books: filtered_books });
    } else {
        return res.status(404).json({ message: "Book of this title not found!" });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    const this_isbn = req.params.isbn;
    
    const filtered_books = books[this_isbn].reviews;

    if(filtered_books) {
        return res.send(filtered_books);
    } else {
        return res.status(300).json({message: "Book of this isbn not found!"});
    };

    /*
  const isbn = req.params.isbn;

  return res.status(200).json({ reviews: books[isbn].reviews });
    */
});

module.exports.general = public_users;
