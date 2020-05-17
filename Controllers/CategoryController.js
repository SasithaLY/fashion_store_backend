let Category = require('../Models/Category_model');
const Product = require('../Models/ProductModel_');

exports.listCate = (req, res) => {
    Category.find()
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.create = (req, res) => {
    const categoryName = req.body.categoryName;

    const newCategory = new Category({categoryName});

    newCategory.save()
        .then(() => res.json('Category Added'))
        .catch(err => res.status(400).json({
            error: 'Error in Category Creation!'
        }));
};

exports.update = (req, res) => {
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
};

exports.deleteCate = (req, res) => {
    console.log('req.id', req.params.categoryId);
    console.log('cat name', req.body);

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
};