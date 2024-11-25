const express = require('express');
const { createAnOrder, getOrderByEmail } = require('./order.controller');


const router = express.Router();

// frontend request=> backend server => controller => book schema => databse => sens to server => bsck to front end
//Post when submit from frontend to db
// Get from db 
//put or patch update or edit the db
// delete from data base

//CREATE ORDER ENDPOINT
router.post("/create-order", createAnOrder);


// GETORDERS BY USER EMAIL
router.get("/get-order-email/:email", getOrderByEmail);




module.exports = router;
