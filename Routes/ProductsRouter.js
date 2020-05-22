const express = require("express");
const {isOwner} = require("../Controllers/auth");
const {updateReview} = require("../Controllers/product");
const {isStoreManager} = require("../Controllers/auth");
const {userById} = require("../Controllers/UserController");
const {isAdmin} = require("../Controllers/auth");
const {requireSignin} = require("../Controllers/auth");
const {isAuth} = require("../Controllers/auth");
const router = express.Router();

const {create, productById, read, remove, update, newArrivalList, categoryRelatedProducts, listWithFilter, photo} = require("../Controllers/product");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isStoreManager, create); //done
router.delete( "/product/remove/:productId/:userId", requireSignin, isAuth, isStoreManager, /*isOwner,*/ remove); //done
router.put( "/product/updateProduct/:productId/:userId", requireSignin, isAuth, isStoreManager, /*isOwner,*/  update); //done
router.get("/products", newArrivalList);
router.get("/products/category/:categoryId", categoryRelatedProducts);
router.post("/products/withFilter", listWithFilter);
router.post("/products/productsByAdmin", listWithFilter);
router.get("/product/photo/:productId", photo);

router.put("/updateReview/:productId", updateReview);
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
