const router = require('express').Router();
let Category = require('../Models/Category_model');

router.route('/all').get((req, res) => {
    Category.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const categoryName = req.body.categoryName;

    const newCategory = new Category({categoryName});

    newCategory.save()
        .then(() => res.json('Category Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;