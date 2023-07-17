const express = require('express');
const router = express.Router();
const controller = require('../controller');

// Menu
router.get('/menu', controller.getProducts)
router.post('/add-product', controller.addProduct)
router.get('/product/:id', controller.getProduct)

//Vendor
router.get('/vendors', controller.getVendors)
router.post('/add-vendor', controller.addVendor)
router.get('/vendor/:id', controller.getVendorProducts)

//User 
router.post('/register', controller.addNewUser)
router.post('/login', controller.getUser)
router.post('/logout', controller.logout);
router.get('/:id/cart', controller.getCart)
router.put('/:id/cart', controller.addUserCart)

module.exports = router;