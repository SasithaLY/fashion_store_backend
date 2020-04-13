const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch
} = require("../Controllers/product");

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
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("productId", productById);

module.exports = router;
