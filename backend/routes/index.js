const express = require('express');
const router = express.Router();
const controller = require('../controller');

// Menu
router.get('/menu', controller.getProducts)
router.get('/product/:id', controller.getProduct)

//Vendor
router.get('/vendors', controller.getVendors)
router.get('/vendor/:id', controller.getVendorProducts)

//User 
router.post('/register', controller.addNewUser)
router.post('/login', controller.getUser)
router.post('/logout', controller.logout);
router.put('/:id/cart', controller.addUserCart)

module.exports = router;