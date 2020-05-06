const express = require("express");
const {isAdmin} = require("../Controllers/auth");
const {requireSignin} = require("../Controllers/auth");
const {isAuth} = require("../Controllers/auth");
const router = express.Router();

const {create, productById, read, remove, update, list, categoryRelatedProducts, listCategories, listBySearch, photo, listSearch} = require("../Controllers/product");

// const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
// const { userById } = require("../Controllers/UserController");

router.get("/product/:productId", read);

// requireSignin, isAuth, isAdmin, down
router.post("/product/create", create);
router.delete( "/product/remove/:productId", remove);
router.put( "/product/updateProduct/:productId", update);
router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/category/:categoryId", categoryRelatedProducts);
router.get("/products/categories", listCategories);
router.post("/products/withFilter", listBySearch);
router.post("/products/productsByAdmin", listBySearch);
router.get("/product/photo/:productId", photo);
router.param("productId", productById);

module.exports = router;
