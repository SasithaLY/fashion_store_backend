const router = require('express').Router();
let Product = require('../Models/Product_model');
const multer = require('multer');

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const productName = req.body.productName;

    const newProduct = new Product({productName});

    newProduct.save()
        .then(() => res.json('Product Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });
//
// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };
//
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });
//
// router.post("/uploadImg", upload.single('productImage'), (req, res, next) => {
//     const product = new Product({
//         productName: req.body.name,
//         productImage: req.file.path
//     });
//     product
//         .save()
//         .then(result => {
//             console.log(result);
//             res.status(201).json({
//                 message: "Created product successfully",
//                 createdProduct: {
//                     name: result.name,
//                     price: result.price,
//                     _id: result._id,
//                     request: {
//                         type: 'GET',
//                         url: "http://localhost:3000/products/" + result._id
//                     }
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });


module.exports = router;