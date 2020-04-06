const express = require('express');
const app = express();
require('dotenv').config();


const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const Schema = mongoose.Schema;
let PicModel = require('./Models/picModel');


app.get('/', (req, res) => {
    res.send("hello from node");
});

const port = process.env.PORT || 8000

app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection established Successfully!');
});

const productRouter = require('./Routes/ProductsRouter');
const categoryRouter = require('./Routes/CategoryRouter');

app.use('/productsRouter', productRouter);
app.use('/categoriesRouter', categoryRouter);


app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename;
    },
}).array('files', 2));

app.post('/upload',function(req,res){

    const paths = [];
    req.files.map(file => {
        paths.push(file.path);
    });


    const newPic = new PicModel();
    newPic.productName = req.body.productName;
    const imageObj = {data: fs.readFileSync(paths[0]), contentType: 'image/png'};
    const imageObj1 = {data: fs.readFileSync(paths[0]), contentType: 'image/png'};
    // newPic.image.data = fs.readFileSync(paths[0]);
    newPic.image.push(imageObj);
    newPic.image.push(imageObj1);
    newPic.save();

});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});