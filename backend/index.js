require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.port || 5000;
const mongoose = require('mongoose');
const cors = require('cors');


//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));


//BOOK ROUTES
const bookRoutes = require('./src/books/book.route.js');
app.use('/api/books', bookRoutes);

//ORDER ROUTES
const orderRoutes = require('./src/orders/order.route.js');
app.use('/api/orders', orderRoutes);

// ADMIN DASHBOARD
//ORDER ROUTES
const userRoutes = require('./src/users/user.route.js');
app.use('/api/auth', userRoutes);




async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Book Server is running')
      });
  
}

main().then(() => console.log("MongoDB Connected successfully")).catch(err => console.log(err));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})