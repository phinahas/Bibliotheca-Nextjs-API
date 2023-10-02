const express = require('express');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const middleware = require('../middlewares/adminFns');

const router = express.Router();

router.post('/create-book',adminController.createBook);

router.get('/get-orders',adminController.getAllOrders);

router.post('/change-book-status',adminController.changeBookStatus);

router.post('/change-order-status',adminController.changeOrderStatus);

router.get('/get-books',middleware.addAdminStatus,userController.getBooks);

router.get('/get-all-vendors',adminController.getAllVendors);

router.post('/change-vendor-status',adminController.changeVendorStatus);




module.exports = router;