const express = require('express');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Get order history
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

// Place a new order
router.post('/', async (req, res) => {
    const { items, tableNumber, contactNumber } = req.body;

    const total_price = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const newOrder = new Order({ total_price, table_number: tableNumber, contact_number: contactNumber });
    await newOrder.save();
    
    for (const item of items) {
        const orderItem = new OrderItem({
            order_id: newOrder._id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            price: item.price
        });
        await orderItem.save();
        
        // Update available quantity
        await MenuItem.updateOne({ _id: item.menu_item_id }, { $inc: { available_quantity: -item.quantity } });
    }
    
    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
});

module.exports = router;
