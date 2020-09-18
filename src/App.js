import React, { useState } from 'react';
import './App.css';
import AddNewOrder from './components/AddNewOrder';
import Orders from './components/Orders';
import OrderDetail from './components/OrderDetail';

function App() {
  const [page, setPage] = useState('orders');
  const [orderDetail, setOrderDetail] = useState(null);

  const onAddNewHandler = () => {
    setPage('addNewOrder')
  }

  const goToOrder = () => {
    setPage('orders');
  }

  const gotToOrderDetail = (value) => {
    setOrderDetail(value)
    setPage('orderDetails');
  }

  return (
    <div className="App">
      <button onClick={onAddNewHandler} style={{ color: page === 'addNewOrder' ? '#f00' : '#000' }}>Add New Order</button>
      <button onClick={goToOrder} style={{ color: page === 'orders' ? '#f00' : '#000' }}>Orders</button>
      {
        page === 'orders' ? <Orders OrderDetail={gotToOrderDetail} />
          : page === 'addNewOrder' ? <AddNewOrder onSubmit={goToOrder} />
            : page === 'orderDetails' ? <OrderDetail order={orderDetail} /> : <Orders OrderDetail={gotToOrderDetail} />
      }
    </div>
  );
}

export default App;
