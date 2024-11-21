const express = require('express');
const app = express();
const port = process.env.port || 5000;
const mongoose = require('mongoose');




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017test');
    app.use('/', (req, res) => {
        res.send('Book Server is running')
      });
  
}

main().then(() => console.log("MongoDB Connected successfully")).catch(err => console.log(err));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})