const express = require('express')
const router = express.Router();
const MusicCart = require('../models/productModel');

router.get('/company', async (req, res) => {
    try {
        const uniqueBrands = await MusicCart.distinct("Brand");
        res.json(uniqueBrands);
    } catch (error) {
        console.log('Error getting company:', error);
        res.status(500).send('Error getting company');
    }
});

router.get('/headphone_type',async(req,res)=>{
try{
    const uniqueHeadphonetype =await MusicCart.distinct("Connectivity_Type");
    res.json(uniqueHeadphonetype);
} catch {
    console.log('Error getting headphone type:', error);
    res.status(500).send('Error getting headphone type');
}
})

router.get('/color',async(req,res)=>{
    try {
        const uniqueColor= await MusicCart.distinct("Colour");
        const limitedUniqueColors = uniqueColor.slice(); 
        res.json(limitedUniqueColors)
    }
    catch (error) {
        console.log('error getting color',error)
        res.status(500).send('error getting color')
    }
})

module.exports = router