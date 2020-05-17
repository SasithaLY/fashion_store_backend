const { WishList, wishModel} = require('../Models/WishListModel');


exports.create = (req, res) => {
    console.log("Create Wishlist:", req.body);

    req.body.wishlist.user = req.profile;
    const wishlist = new WishList(req.body.wishlist);

    wishlist.save((error, data) => {
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(data);
    })
};

exports.readWishList = (req, res) => {
    WishList.find({ user: req.profile._id })
      .populate("user", "_id name")
      .sort("-created")
      .exec((err, wishlist) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          res.json(wishlist);
        }
      });
  };