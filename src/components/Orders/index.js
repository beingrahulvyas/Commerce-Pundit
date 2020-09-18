import React, { useState } from 'react';

const Orders = ({ OrderDetail }) => {
    const [orders] = useState(JSON.parse(localStorage.getItem('orders')) && JSON.parse(localStorage.getItem('orders')));

    return (
        <div>
            <ul>
                <li>
                    <h5>Order Number</h5>
                    <h5>First Name</h5>
                    <h5>Urgency</h5>
                    <h5>Total Products</h5>
                    <h5>Total Price</h5>
                </li>
                {orders && orders.map((value, index) => {
                    return (
                        <li key={index} style={{ cursor: 'pointer' }} onClick={() => OrderDetail(value)}>
                            <p>{value.id}</p>
                            <p>{value.name}</p>
                            <p>{value.urgent ? 'Urgency' : 'Non Urgency'}</p>
                            <p>{Object.keys(value.products).length}</p>
                            <p>{value.total}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Orders;