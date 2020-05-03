const router = require('express').Router();
let Category = require('../Models/Category_model');
const {isAdmin} = require("../Controllers/auth");
const {isAuth} = require("../Controllers/auth");
const Product = require('../Models/ProductModel_');

router.route('/all').get((req, res) => {
    Category.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addCategory', isAuth, isAdmin).post((req, res) => {
    const categoryName = req.body.categoryName;

    const newCategory = new Category({categoryName});

    newCategory.save()
        .then(() => res.json('Category Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateCategory/:categoryId').put((req, res) => {
    console.log('req.id', req.params.categoryId);
    console.log('cat name', req.body.categoryName);

    Category.updateOne({_id: req.params.categoryId}, {categoryName: req.body.categoryName}, function (err) {
        if (err) {
            res.status(400).json({
                error: 'Error in Category Update!'
            })
        } else {
            res.json('Successful!')
        }
    });
});

router.route('/deleteCategory/:categoryId').delete((req, res) => {
    console.log('req.id', req.params.categoryId);
    console.log('cat name', req.body.categoryName);

    Product.find({category: req.params.categoryId}).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                error: `Selected Category can't be deleted! It has ${data.length} number of products.`
            });
        } else {
            Category.deleteOne({_id: req.params.categoryId}, function (err) {
                if (err) {
                    console.log(err)
                    res.status(400).json({
                        error: 'Error in Category Delete!'
                    })
                } else {
                    res.json('Successful!');
                }
            });
        }
    })
});


module.exports = router;