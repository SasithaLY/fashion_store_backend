const {userById} = require("../Controllers/UserController");
const {deleteCate} = require("../Controllers/CategoryController");
const {update} = require("../Controllers/CategoryController");
const router = require('express').Router();
const { requireSignin, isAuth, isAdmin } = require("../Controllers/auth");
const {create} = require("../Controllers/CategoryController");
const {listCate} = require("../Controllers/CategoryController");

router.get('/all', listCate);

router.post('/addCategory/:userId', requireSignin, isAuth, isAdmin, create);

router.put('/updateCategory/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/deleteCategory/:categoryId/:userId', requireSignin, isAuth, isAdmin, deleteCate);

router.param("userId", userById);

module.exports = router;