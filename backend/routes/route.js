const express = require('express');
const router = express.Router();
const controller = require('../controller/index');

router.get('/', (req, res) => {
    res.send("Server connected")
})

// Menu
router.get('/menu', controller.getProducts)
router.post('/add-product', controller.addProduct)

//Vendor
router.get('/vendors', controller.getVendors)
router.post('/add-vendor', controller.addVendor)

//Category
router.get('/categories', controller.getCategories)
router.post('/add-category', controller.addCategory)

module.exports = router;