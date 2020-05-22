const { WishList, wishModel} = require('../Models/WishListModel');
const {errorHandler} = require('../Helpers/dbErrorHandler');

exports.create = (req, res) => {
    console.log("Create Wishlist:", req.body);
    WishList.find({ user: req.profile._id, "products._id":req.body.wishlist.products._id})
      .populate("user", "_id name")
      .sort("-created")
      .exec((err, wishlist) => {
        console.log("check", wishlist);
        if(wishlist.length){
          
            return res.status(400).json({
                error:"Product Already Exist!",
            })
       
        }else{
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

        }

       
      });

    
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

  
  exports.deleteWishList = (req, res) => {
    let wishlistProduct = req.wishlist;
    wishlistProduct.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product removed from wishlist successfully'
        });
    });
};


exports.WishlistById = (req, res, next, id) => {
  WishList.findById(id)
      .exec((err, wishlist) => {
          if (err || !wishlist) {
              return res.status(400).json({
                  error: 'Wishlist not found'
              });
          }
          req.wishlist = wishlist;
          next();
      });
};