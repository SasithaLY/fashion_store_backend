const express = require("express");
const router = express.Router();

const {create, productById, read, remove, update, list, categoryRelatedProducts, listCategories, listBySearch, photo, listSearch} = require("../Controllers/product");

// const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
// const { userById } = require("../Controllers/UserController");

router.get("/product/:productId", read);

// requireSignin, isAuth, isAdmin, down
router.post("/product/create", create);


router.delete(
    "/product/:productId/:userId"
);
router.put(
    "/product/:productId/:userId"
);

router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/category/:categoryId", categoryRelatedProducts);
router.get("/products/categories", listCategories);
router.post("/products/withFilter", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("productId", productById);

module.exports = router;
