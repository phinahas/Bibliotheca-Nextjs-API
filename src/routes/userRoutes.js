const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/create-user',userController.createUser);

router.post('/signin',userController.signIn);

router.post('/getUser',userController.getUser);

router.get("/get-books",userController.getBooks);

router.post('/add-to-cart',userController.addToCart);

router.post('/remove-from-cart',userController.removeFromCart);

router.get('/get-cart',userController.getCart);

router.post('/buy-product',userController.buyProduct);

router.get('/get-orders',userController.getAllOrders);

router.get('/get-searched-book',userController.searchAndGetBooks);


module.exports = router;