const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
require('dotenv').config();

//import routes
const authRoutes = require("./Routes/auth"); 
const userRoutes = require("./Routes/UserRoutes"); 
const addressRoutes = require("./Routes/address"); 
const braintreeRoutes = require("./Routes/braintree"); 
const orderRoutes = require("./Routes/order"); 
const locationRoutes = require("./Routes/LocationRoutes"); 
const wishlistRoutes = require("./Routes/wishlist"); 
const promoRoutes = require("./Routes/PromoRoutes"); 
const productRouter = require('./Routes/ProductsRouter');
const categoryRouter = require('./Routes/CategoryRouter');


//app
const app = express();

//db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected!"));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", addressRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);
app.use("/api", locationRoutes);
app.use("/api", wishlistRoutes);
app.use("/api", promoRoutes);
app.use('/productsRouter', productRouter);
app.use('/categoriesRouter', categoryRouter);


//default route
app.get('/', (req, res) => {
    res.json({message:"hello from node"});
}); 

const port = process.env.PORT || 8000 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





//ishan's code

// const multer = require('multer');
// const fs = require('fs');
// const Schema = mongoose.Schema;
//
// let PicModel = require('./Models/product_model_multiple');

// app.use(cors());
// // app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());


//Routes






// app.use(multer({
//     dest: './uploads/',
//     rename: function (fieldname, filename) {
//         return filename;
//     },
// }).array('files', 4));
//
// app.post('/upload',function(req,res){
//
//     const paths = [];
//     req.files.map(file => {
//         paths.push(file.path);
//     });
//
//
//     const newPic = new PicModel();
//     newPic.productName = req.body.productName;
//
//     for ( let i = 0; i < paths.length; i++) {
//         const imageObj = {data: fs.readFileSync(paths[i]), contentType: 'image/png'};
//         newPic.image.push(imageObj);
//     }
//
//     // const imageObj = {data: fs.readFileSync(paths[0]), contentType: 'image/png'};
//     // const imageObj1 = {data: fs.readFileSync(paths[0]), contentType: 'image/png'};
//     // // newPic.image.data = fs.readFileSync(paths[0]);
//     // newPic.image.push(imageObj);
//     // newPic.image.push(imageObj1);
//     newPic.save();
//
// });



