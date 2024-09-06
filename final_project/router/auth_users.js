const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
        username:"coursera_module"
        , password:"coursera123"
    }
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let users_with_same_name = users.filter((user) => {
        return user.username = username
    });

    if(users_with_same_name.length > 0) {
        return true;
    } else {
        return false;
    }
    /*
  const user = users.find((user) => user.username === username);
  return !!user;
    */
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let valid_user = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    if(valid_user.length > 0) {
        return true;
    } else {
        return false;
    };

    /*
  const validUser = users.find(
    (user) => user.username === username && user.password === password
  );

  return !!validUser;
      */
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    const this_username = req.body.username;
    const this_password = req.body.password;

    if(!this_username || !this_password) {
        return res.status(404).json({message: "Login error!"});
    };

    if(authenticatedUser(this_username, this_password)) {
        let accessToken = jwt.sign(
            {data: password}
            , "access"
            , {expiresIn: 60 * 60}
        );

        req.session.authorization = {
            accessToken
            , username
        };

        return res.status(200).send("User logged in successfully!");
    } else {
        return res.status(208).json({message: "Invalid Login!"});
    };

    /*
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      {
        expiresIn: 60 * 60,
      }
    );

    req.session.authorization = { accessToken, username };

    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).send("Invalid Login. check username and password");
  }    */
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    const this_isbn = req.params.isbn;
    const this_review = req.body.review;

    console.log('req.session.authorization["username"]');

    books[this_isbn].reviews[req.session.authorization["username"]] = review;

    return res.status(200).json({message: "review added", reviews: books[this_isbn].reviews});

 // return res.status(300).json({message: "Yet to be implemented"});

    /*
  const isbn = req.params.isbn;
  const review = req.body.review;
  console.log(req.session.authorization["username"]);
  books[isbn].reviews[req.session.authorization["username"]] = review;
  return res
    .status(200)
    .json({ message: "review succeed", reviews: books[isbn].reviews });
    */
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn = req.params.isbn;
  
    delete books[isbn].reviews[req.session.authorization["username"]];
    return res
      .status(200)
      .json({ message: "review deleted", reviews: books[isbn].reviews });
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
