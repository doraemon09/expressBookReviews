const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    res.send(books);

  return res.status(300).json({message: "Yet to be implemented"});
    /*
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(books), 600);
  });

  promise.then((result) => {
    return res.status(200).json({ books: result });
  });
    */
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const this_isbn = req.params.isbn;

    let filtered_books = books[this_isbn];

    if(filtered_books) {
        res.send(filtered_books);
    } else {
        return res.status(300).json({message: "Book of this isbn not found"});
    };
    
    /*
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(books[req.params.isbn]), 600);
  });

  const book = await promise;

  if (book) {
    return res.status(200).json({ book });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
    */
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    const this_author = req.params.author;

    const filtered_books = Object.values(books).filter((book) => book.author === this_author);

    if(filtered_books) {
        res.send(filtered_books);
    } else {
        return res.status(300).json({message: "Book of this author not found!"});
    };

    /*
  const authorName = req.params.author;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredBooks = Object.values(books).filter(
        (b) => b.author === authorName
      );
      resolve(filteredBooks);
    }, 600);
  });

  const filteredBooks = await promise;

  if (filteredBooks.length > 0) {
    return res.status(200).json({ books: filteredBooks });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
    */
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    const this_title = req.params.title;

    const filtered_books = Object.values(books).filter((book) => book.title === this_title);

    if(filtered_books) {
        res.send(filtered_books);
    } else {
        return res.status(300).json({message: "Book of this title not found!"});
    };

    /*
  const title = req.params.title;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredBooks = Object.values(books).filter(
        (b) => b.title === title
      );
      return resolve(filteredBooks);
    }, 600);
  });

  const filteredBooks = await promise;

  if (filteredBooks.length > 0) {
    return res.status(200).json({ books: filteredBooks });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
    */
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
