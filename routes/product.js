const express = require('express')
const router = express.Router();
const MusicCart = require('../models/productModel');

router.get('/products', async (req, res) => {
    try {
        const products = await MusicCart.find().limit(20);
        res.json(products);
    } catch (error) {
        console.log('Error getting products:', error);
        res.status(500).send('Error getting products');
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const product = await MusicCart.findById(req.params.id);
        res.json(product);
    } catch (error) {
        console.log('Error getting product:', error);
        res.status(500).send('Error getting product');
    }
}
);

module.exports = router