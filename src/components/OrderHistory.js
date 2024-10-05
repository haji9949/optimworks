import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('http://localhost:5000/orders');
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Order History</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        Order ID: {order._id} - Total Price: ${order.total_price} - Date: {new Date(order.order_date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory;
