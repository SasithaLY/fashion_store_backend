const express = require("express");
const {updateReview} = require("../Controllers/product");
const {isStoreManager} = require("../Controllers/auth");
const {userById} = require("../Controllers/UserController");
const {isAdmin} = require("../Controllers/auth");
const {requireSignin} = require("../Controllers/auth");
const {isAuth} = require("../Controllers/auth");
const router = express.Router();

const {create, productById, read, remove, update, newArrivalList, categoryRelatedProducts, listCategories, listWithFilter, photo, listSearch} = require("../Controllers/product");

router.get("/product/:productId", read);

router.post("/product/create/:userId", requireSignin, isAuth, isStoreManager, create); //done
router.delete( "/product/remove/:productId/:userId", requireSignin, isAuth, isStoreManager, remove); //done
router.put( "/product/updateProduct/:productId/:userId", requireSignin, isAuth, isStoreManager, update); //done
router.get("/products", newArrivalList);
// router.get("/products/search", listSearch);
router.get("/products/category/:categoryId", categoryRelatedProducts);
router.get("/products/categories", listCategories);
router.post("/products/withFilter", listWithFilter);
router.post("/products/productsByAdmin", listWithFilter);
router.get("/product/photo/:productId", photo);

router.put("/updateReview/:productId", updateReview);
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
