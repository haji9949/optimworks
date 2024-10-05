import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await axios.get('http://localhost:5000/menu');
            setMenuItems(response.data);
        };
        fetchMenu();
    }, []);

    const addToOrder = (item) => {
        const existingItem = orderItems.find(orderItem => orderItem._id === item._id);
        if (existingItem) {
            setOrderItems(orderItems.map(orderItem =>
                orderItem._id === item._id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
            ));
        } else {
            setOrderItems([...orderItems, { ...item, quantity: 1 }]);
        }
    };

    const placeOrder = async () => {
        const orderData = {
            items: orderItems.map(item => ({
                menu_item_id: item._id,
                quantity: item.quantity,
                price: item.price
            })),
            tableNumber: "1",
            contactNumber: "1234567890"
        };
        await axios.post('http://localhost:5000/orders', orderData);
        alert('Order placed successfully!');
        setOrderItems([]); // Clear order after placing
    };

    return (
        <div>
            <h1>Menu</h1>
            <ul>
                {menuItems.map(item => (
                    <li key={item._id}>
                        {item.name} - ${item.price} ({item.available_quantity} available)
                        <button onClick={() => addToOrder(item)}>Add to Order</button>
                    </li>
                ))}
            </ul>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
};

export default MenuPage;
