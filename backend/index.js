require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.port || 5000;
const mongoose = require('mongoose');
const cors = require('cors');


//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173',"https://book-store-app-frontend-xi.vercel.app"],
    credentials: true
}));


//BOOK ROUTES
const bookRoutes = require('./src/books/book.route.js');
app.use('/api/books', bookRoutes);

//ORDER ROUTES
const orderRoutes = require('./src/orders/order.route.js');
app.use('/api/orders', orderRoutes);

//ORDER ROUTES
const userRoutes = require('./src/users/user.route.js');
app.use('/api/auth', userRoutes);


// ADMIN DASHBOARD
const adminRoutes = require('./src/stats/admin.stats.js');
app.use('/api/admin', adminRoutes);




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