const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Get available menu items
router.get('/', async (req, res) => {
    const menuItems = await MenuItem.find({ available_quantity: { $gt: 0 } });
    res.json(menuItems);
});

module.exports = router;
