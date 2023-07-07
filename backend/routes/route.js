const express = require('express');
const router = express.Router();
const controller = require('../controller/index');

router.get('/', (req, res) => {
    res.send("Server connected")
})

// Menu
router.get('/menu', controller.getProducts)
router.post('/add-product', controller.addProduct)
router.get('/product/:id', controller.getProduct)

//Vendor
router.get('/vendors', controller.getVendors)
router.post('/add-vendor', controller.addVendor)
router.get('/vendor/:id', controller.getVendorProducts)

//Category
router.get('/categories', controller.getCategories)
router.post('/add-category', controller.addCategory)

//User 
router.post('/register', controller.addNewUser)
router.post('/login', controller.getUser)
router.post('/logout', controller.logout);
router.get('/:id/cart', controller.getCart)
router.put('/:id/cart', controller.addUserCart)
// router.post('/mail', controller.sendMail)

module.exports = router;