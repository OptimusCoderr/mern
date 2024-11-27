const express = require('express');
const { postABook, getAllBooks, getSingleBook, updateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

// frontend request=> backend server => controller => book schema => databse => sens to server => bsck to front end
//Post when submit from frontend to db
// Get from db 
//put or patch update or edit the db
// delete from data base

//POST A BOOK
router.post("/create-book",verifyAdminToken, postABook);

// get all books
router.get("/get-all-books", getAllBooks);

//single book endpoint
router.get("/get-book/:id", getSingleBook);

//Update a book endpoint
router.put("/update-book/:id",verifyAdminToken, updateBook);

//delete a book endpoint
router.delete("/delete-book/:id",verifyAdminToken, deleteABook);



module.exports = router;
