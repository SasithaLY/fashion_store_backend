const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');

//BodyParser Middleware
// app.use(bodyParser.json());

const Schema = mongoose.Schema;

let PicModel = require('./Models/picModel');

app.get('/', (req, res) => {
    res.send("hello from node");
});

const port = process.env.PORT || 8000 

app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//DB Config
const uri = process.env.ATLAS_URI;

//Connect to Mongo DB
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection established Successfully!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//Routes
const productRouter = require('./Routes/ProductsRouter');
const categoryRouter = require('./Routes/CategoryRouter');
const userRouter = require("./Routes/UserRouter"); 

app.use('/productsRouter', productRouter);
app.use('/categoriesRouter', categoryRouter);
app.use("/userRouter", userRouter);


app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename;
    },
}).single('files'));

app.post('/upload',function(req,res){
    const newPic = new PicModel();
    newPic.image.data = fs.readFileSync(req.files.path);
    newPic.image.contentType = 'image/png';
    newPic.save();
});



