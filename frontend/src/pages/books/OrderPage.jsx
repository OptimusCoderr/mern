import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';
import './OrderPage.css'; // Import the CSS file

const OrderPage = () => {
    const { currentUser  } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser .email);

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) return <div className="error">Error getting orders data</div>;

    return (
        <div className='order-container'>
            <h2 className='order-title'>Your Orders</h2>
            {
                orders.length === 0 ? (
                    <div className='no-orders'>No orders found!</div>
                ) : (
                    <div className='orders-list'>
                        {
                            orders.map((order, index) => (
                                <div key={order._id} className="order-card">
                                    <p className='order-number'># {index + 1}</p>
                                    <h2 className="order-id">Order ID: {order._id}</h2>
                                    <p className="order-detail">Name: {order.name}</p>
                                    <p className="order-detail">Email: {order.email}</p>
                                    <p className="order-detail">Phone: {order.phone}</p>
                                    <p className="order-detail">Total Price: ${order.totalPrice}</p>
                                    <h3 className="address-title">Address:</h3>
                                    <p className="address-detail">
                                        {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                                    </p>
                                    <h3 className="products-title">Products Id:</h3>
                                    <ul className="product-list">
                                        {order.productIds.map((productId) => (
                                            <li key={productId} className="product-item">{productId}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default OrderPage;