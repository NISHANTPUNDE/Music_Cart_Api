const mongoose = require('mongoose');

const musiccartSchema = new mongoose.Schema({
    title: { type: String },
    actualPrice: { type: Number },
    sellingPrice: { type: Number },
    brand: { type: String },
    model: { type: String },
    color: { type: String },
    formFactor: { type: String },
    connectivityType: { type: String },
    imgSrc: { type: String, required: false },
});

module.exports = mongoose.model('MusicCart', musiccartSchema,'musiccart');
// module.exports = mongoose.model('musiccart', musiccartSchema);
