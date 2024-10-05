const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    available_quantity: { type: Number, required: true },
    sub_category: { type: String },
    image_url: { type: String },
    type: { type: String }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
