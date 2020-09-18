import React from 'react';

const OrderDetail = ({order}) => {
    return (
        <div>
            <p>Order Number: {order.id}</p>
            <p>First Name: {order.name}</p>
            {
                order.products && Object.keys(order.products).map((value) => {
                    return (
                        <div>
                            <p>id: {value}</p>
                            <p>{order.products[value].type}: {order.products[value].value}</p>
                            <p>price: {order.products[value].price}</p>
                            <p>name: {order.products[value].name}</p>
                        </div>
                    );
                })
            }
            <p>Total Price: {order.total}</p>
            <p>Urgency: {order.urgent ? 'Urgency' : 'Non Urgency'}</p>
        </div>
    );
}

export default OrderDetail;