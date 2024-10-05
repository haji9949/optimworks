const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    total_price: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    order_date: { type: Date, default: Date.now },
    table_number: { type: String },
    contact_number: { type: String }
});

module.exports = mongoose.model('Order', orderSchema);
