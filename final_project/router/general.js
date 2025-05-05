const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
/* TASK 1
public_users.get('/',function (req, res) {
  return res.status(300).json(books);
});*/

//TASK 10
public_users.get('/', function (req, res) {
    new Promise((resolve, reject) => {
      resolve(books);
    })
    .then((bookData) => {
      return res.status(200).json(bookData);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error fetching books" });
    });
  });

// Get book details based on ISBN
/* TASK 2
public_users.get('/isbn/:isbn',function (req, res) {  
  return res.status(300).json(books[req.params.isbn]);
 });*/

 // TASK 11
public_users.get('/isbn/:isbn',function (req, res) {  
    new Promise((resolve, reject) => {
        resolve(books[req.params.isbn]);
      })
      .then((bookData) => {
        return res.status(200).json(bookData);
      })
      .catch((err) => {
        return res.status(500).json({ message: "Error fetching book" });
      });
 });
  
// Get book details based on author
/* TASK 3
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    books_filtered = Object.values(books).filter((book)=> book.author === author);
    return res.status(300).json(books_filtered);
});*/

// TASK 12
public_users.get('/author/:author',function (req, res) {
    new Promise((resolve, reject) => {
        const author = req.params.author;
        books_filtered = Object.values(books).filter((book)=> book.author === author);
        resolve(books_filtered);
      })
      .then((bookData) => {
        return res.status(200).json(bookData);
      })
      .catch((err) => {
        return res.status(500).json({ message: "Error fetching book" });
      });
});

// Get all books based on title
/* TASK 4
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    books_filtered = Object.values(books).filter((book)=> book.title === title);    
    return res.status(300).json(books_filtered);
});*/

// TASK 13
public_users.get('/title/:title',function (req, res) {
    new Promise((resolve, reject) => {
        const title = req.params.title;
        books_filtered = Object.values(books).filter((book)=> book.title === title);
        resolve(books_filtered);
      })
      .then((bookData) => {
        return res.status(200).json(bookData);
      })
      .catch((err) => {
        return res.status(500).json({ message: "Error fetching book" });
      });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    return res.status(300).json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
