const {Order, Item} = require('../Models/Order');


exports.create = (req, res) => {
    console.log("create order:", req.body);

    req.body.order.user = req.profile;
    const order = new Order(req.body.order);

    order.save((error, data) => {
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(data);
    })
};

exports.getOrders = (req, res) => {
    Order.find()
    .populate('user', "_id, fName , lName , email")
    .sort('-created')
    .exec((err, orders) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(orders);
    })
}

exports.getStates = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
}


exports.orderById = (req, res, next, id) =>{
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) =>{
        if(err || !order){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        req.order = order;
        next();
    });
}

exports.updateStatus = (req, res) => {
    Order.update({_id: req.body.orderId}, {$set:{status: req.body.status}}, (err, order) =>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(order);
    })
}