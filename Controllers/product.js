const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../Models/ProductModel_');
const {isAuth} = require("./auth");
const {errorHandler} = require('../Helpers/dbErrorHandler');


exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        const {name, description, price, category, quantity, shipping, storeMgrID, oldPrice} = fields;


        if (!name || !description || !price || !category || !quantity || !shipping || !storeMgrID) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields);

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                // console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image size issue, Image should be less than 1mb in size'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image size issue, Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.newArrivalList = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select('-photo')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};

exports.categoryRelatedProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    // console.log('backend ', req.params.categoryId)
    Product.find({category: req.params.categoryId})
        .limit(limit)
        // .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};

exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(categories);
    });
};

exports.listWithFilter = (req, res) => {
    // console.log('authhhhhhhhhhhhhhhhhhhhhhhhhhh',isAuth());
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        // console.log('body filters', req.body.filters)
        // console.log('Filter key', req.body.filters[key])
        if (key === 'name') {
            const regex = new RegExp(req.body.filters.name.toLowerCase(), "i");
            findArgs[key] = regex
            console.log('nameeeeeeeeeeeeeeee', regex)
        } else if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };

                // console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', findArgs)

            } else {
                findArgs[key] = req.body.filters[key];
                // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx', findArgs)
            }
        }
    }
    // console.log('fins args', findArgs)

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.deductQuantity = (req, res, next) => {

    let options = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: {_id: item._id},
                update: {$inc: {quantity: -item.count, sold: +item.count}}
            }
        }
    });

    Product.bulkWrite(options, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: "Could not update product count"
            });
        }
        next();
    });
}

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
};

exports.updateReview = (req, res) => {
    // console.log(req.body)
    let product = req.product;
    product.review = [...product.review];

    let data = { rating: req.body.rating, subject: req.body.subject, description: req.body.review };
    product.review.push(data);

    product.save((err, result) => {
        if (err) {
            // console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json("Successfully updated!");
    });

};