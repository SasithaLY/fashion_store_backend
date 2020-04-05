const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const mongoose = require('mongoose');

app.get('/', (req, res)=>{
    res.send("hello from node");
});

const port = process.env.PORT || 8000

app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true} );

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection established Successfully!');
});

const productRouter = require('./Routes/ProductsRouter');

app.use('/productsRouter', productRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})