const express = require('express');
const vendorController = require('../controllers/vendorController');

const router = express.Router();

router.post('/create-book',vendorController.createBook);

router.get("/get-books",vendorController.getBooks);

router.get('/get-sales-report',vendorController.getSalesCount);


router.get('/get-orders',vendorController.getAllOrders);

router.post('/change-order-status',vendorController.changeOrderStatus);


module.exports = router;