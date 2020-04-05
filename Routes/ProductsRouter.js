const router = require('express').Router();
let Product = require('../Models/Product_model');

router.route('/').get((req, res) => {
   Product.find()
       .then(products => res.json(products))
       .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const productName = req.body.productName;

    const newProduct = new Product({productName});

    newProduct.save()
        .then( () => res.json('Product Added'))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;